import { createFileRoute } from "@tanstack/react-router";
import raw from "@/content/legal/refund.txt?raw";
import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/refund-policy")({
  head: () =>
    pageHead({
      title: "Refund & Cancellation Policy — Future Grow Academy",
      description: "When refunds apply to Future Grow Academy digital eBooks, how cancellations work and how refunds are processed.",
      path: "/refund-policy",
    }),
  component: () => <LegalPage raw={raw} headings={[]} />,
});
