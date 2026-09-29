import { createFileRoute } from "@tanstack/react-router";
import raw from "@/content/legal/terms.txt?raw";
import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Service — Future Grow Academy",
      description: "The terms that govern your use of the Future Grow Academy website, eBooks and digital products.",
      path: "/terms",
    }),
  component: () => <LegalPage raw={raw} headings={[]} />,
});
