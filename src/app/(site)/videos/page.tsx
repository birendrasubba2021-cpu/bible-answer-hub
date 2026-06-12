import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Videos",
  description: "Teaching and apologetics videos — coming soon.",
};

export default function VideosPage() {
  return (
    <ComingSoon
      eyebrow="Videos"
      title="Videos Coming Soon"
      description="Apologetics, theology, sermons, and short teaching videos will be added in an upcoming phase, with embedded YouTube playback."
    />
  );
}
