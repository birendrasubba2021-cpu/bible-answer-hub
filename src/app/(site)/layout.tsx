import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Render pages on each request so Vercel build does not need DATABASE_URL.
export const dynamic = "force-dynamic";

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
