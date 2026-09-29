import { createFileRoute } from "@tanstack/react-router";
import raw from "@/content/legal/privacy.txt?raw";
import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

const headings = ["Information We Collect", "How We Use Your Information", "Cookies", "Analytics", "Advertising & Remarketing", "Third-Party Service Providers", "Data Security", "Data Retention", "Sharing of Information", "External Links", "Children’s Privacy", "Your Rights", "Changes to this Privacy Policy", "Contact Us"];

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    pageHead({
      title: "Privacy Policy — Future Grow Academy",
      description: "How Future Grow Academy collects, uses and protects your personal information when you buy and read our eBooks.",
      path: "/privacy-policy",
    }),
  component: () => <LegalPage raw={raw} headings={headings} />,
});
