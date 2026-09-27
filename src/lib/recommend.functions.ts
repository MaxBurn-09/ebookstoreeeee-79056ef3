import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { books } from "@/data/catalog";

export type Recommendation = { slug: string; reason: string };

export const recommendBooks = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ mood: z.string().trim().min(3).max(600) }).parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured yet.");
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    const catalog = books
      .map((b) => `- ${b.slug} | ${b.title} | ${b.category} | ${b.blurb}`)
      .join("\n");
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      maxRetries: 0,
      system:
        "You are a warm, thoughtful bookseller at Future Grow Academy. Recommend ONLY from the catalog given (use exact slugs). Reply with JSON only, no prose: {\"intro\": string (one short friendly sentence), \"picks\": [{\"slug\": string, \"reason\": string (max 25 words, speak to the reader as 'you')}]}. Choose 3 picks, best first. Reply in the same language the reader writes in.",
      prompt: `Catalog:\n${catalog}\n\nReader's mood / interests:\n${data.mood}`,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    let text: string;
    try {
      text = await result.text;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      if (msg.includes("402")) throw new Error("AI credits are used up for now. Please try later.");
      if (msg.includes("429")) throw new Error("Lots of readers right now — please try again in a minute.");
      throw new Error("Couldn't get recommendations right now. Please try again.");
    }
    const match = text.match(/\{[\s\S]*\}/);
    let parsed: { intro?: string; picks?: Recommendation[] } = {};
    try {
      parsed = match ? JSON.parse(match[0]) : {};
    } catch {
      parsed = {};
    }
    const valid = new Set(books.map((b) => b.slug));
    const picks = (parsed.picks ?? [])
      .filter((p) => p && valid.has(p.slug))
      .slice(0, 3)
      .map((p) => ({ slug: p.slug, reason: String(p.reason ?? "").slice(0, 220) }));
    if (!picks.length) throw new Error("Couldn't find a match — try describing your mood differently.");
    return { intro: String(parsed.intro ?? "").slice(0, 200), picks };
  });
