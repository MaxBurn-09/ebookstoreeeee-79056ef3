import { createFileRoute } from "@tanstack/react-router";
import raw from "@/content/legal/cookies.txt?raw";
import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

const headings = ["What Are Cookies?", "How We Use Cookies", "Types of Cookies We Use", "Third-Party Cookies", "Managing Cookies", "Changes to This Cookies Policy", "Contact Us"];

export const Route = createFileRoute("/cookies-policy")({
  head: () =>
    pageHead({
      title: "Cookies Policy — Future Grow Academy",
      description: "How Future Grow Academy uses cookies and similar technologies, and how you can manage them.",
      path: "/cookies-policy",
    }),
  component: () => <LegalPage raw={raw} headings={headings} />,
});
