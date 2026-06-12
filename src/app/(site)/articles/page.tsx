import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Articles",
  description: "In-depth biblical and theological articles — coming soon.",
};

export default function ArticlesPage() {
  return (
    <ComingSoon
      eyebrow="Articles"
      title="Articles Coming Soon"
      description="In-depth articles on theology, apologetics, and Christian living are part of the next phase. The library will hold 10,000+ articles."
    />
  );
}
