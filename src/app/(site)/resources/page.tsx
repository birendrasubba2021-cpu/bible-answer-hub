import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Resources",
  description: "Books, PDF notes, outlines, study guides, and charts — coming soon.",
};

export default function ResourcesPage() {
  return (
    <ComingSoon
      eyebrow="Resources"
      title="Resources Coming Soon"
      description="Downloadable books, PDF notes, outlines, study guides, charts, and infographics will be available in a future phase."
    />
  );
}
