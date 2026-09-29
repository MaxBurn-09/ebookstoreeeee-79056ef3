import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import logo from "@/assets/fga-logo.png.asset.json";
import { books, bundles, storeConfig } from "@/data/catalog";

const transport = new DefaultChatTransport({ api: "/api/chat" });
const trustedChatLinks = new Set([
  ...books.map((book) => `https://futuregrowacademy.co/book/${book.slug}`),
  ...bundles.map(() => "https://futuregrowacademy.co/bundles"),
  ...storeConfig.socials.map((social) => social.href),
  "https://futuregrowacademy.co/contact", "https://futuregrowacademy.co/refund-policy",
  "https://futuregrowacademy.co/privacy-policy", "https://futuregrowacademy.co/terms",
  "https://futuregrowacademy.co/cookies-policy", storeConfig.blogUrl,
]);

export function BookSellerChat() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { messages, sendMessage, status, stop } = useChat({
    transport,
    onError: (failure) => setError(failure.message || "Something went wrong. Please try again."),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth") || pathname.startsWith("/checkout")) return null;

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] right-3 z-50 flex flex-col items-end md:bottom-6 md:right-6">
      {open && (
        <section aria-label="Future Grow Academy book assistant" className="mb-3 flex h-[min(34rem,calc(100dvh-10rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-raised)]">
          <div className="flex min-h-16 items-center gap-3 border-b border-border bg-background px-4">
            <img src={logo.url} alt="" className="h-8 w-8 rounded-sm object-contain" />
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-foreground">Future Grow Academy</h2>
              <p className="text-xs text-muted-foreground">Your book guide</p>
            </div>
            <Button size="icon" variant="ghost" className="h-9 w-9" aria-label="Close chat" onClick={() => setOpen(false)}><X /></Button>
          </div>
          <Conversation className="min-h-0 flex-1 bg-card">
            <ConversationContent className="gap-4 px-4 py-5">
              {messages.length === 0 && (
                <div className="space-y-2 py-4 text-center">
                  <p className="font-display text-xl text-foreground">What would you like to read next?</p>
                  <p className="mx-auto max-w-64 text-sm leading-relaxed text-muted-foreground">Tell me what you’re working on, and I’ll help you find a book from our collection.</p>
                  <Link to="/books" onClick={() => setOpen(false)} className="inline-block pt-2 text-sm font-medium text-primary underline underline-offset-4">Explore all eBooks</Link>
                </div>
              )}
              {messages.map((message) => (
                <Message key={message.id} from={message.role}>
                  <MessageContent className={message.role === "user" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground"}>
                    {message.parts.map((part, index) => part.type === "text" ? (
                      message.role === "assistant" ? <MessageResponse key={index} linkSafety={{ enabled: true, onLinkCheck: (url) => trustedChatLinks.has(url) }} className="text-sm leading-relaxed [&_a]:text-primary [&_a]:underline">{part.text}</MessageResponse> : <span key={index} className="whitespace-pre-wrap">{part.text}</span>
                    ) : null)}
                  </MessageContent>
                </Message>
              ))}
              {status === "submitted" && <div className="text-sm text-muted-foreground"><Shimmer>Finding the right words...</Shimmer></div>}
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            </ConversationContent>
            <ConversationScrollButton aria-label="Scroll to latest message" />
          </Conversation>
          <div className="border-t border-border bg-background p-3">
            <PromptInput onSubmit={({ text }) => {
              const trimmed = text.trim();
              if (!trimmed || busy) return;
              setError("");
              sendMessage({ text: trimmed });
              requestAnimationFrame(() => inputRef.current?.focus());
            }}>
              <PromptInputTextarea ref={inputRef} maxLength={1200} placeholder="Ask about a book or your reading mood..." className="min-h-14 text-sm" />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} onStop={stop} className="size-8" />
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-2 text-center text-xs text-muted-foreground">Book guidance only · Chat isn’t saved</p>
          </div>
        </section>
      )}
      {!open && <Button size="icon" onClick={() => setOpen(true)} aria-label="Chat with our book guide" title="Chat with our book guide" className="btn-gloss size-11 rounded-full shadow-[var(--shadow-card)]"><MessageCircle className="size-5" aria-hidden="true" /></Button>}
    </div>
  );
}