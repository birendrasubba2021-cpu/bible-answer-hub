import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Cache public pages for 2 minutes — faster loads, still fresh after admin edits.
export const revalidate = 120;

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
