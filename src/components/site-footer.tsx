import Link from "next/link";
import { BrandLogoFooter } from "@/components/brand/logo";
import { departments } from "@/lib/departments";
import { SITE } from "@/lib/content";

const EXPLORE_LINKS = [
  { href: "/questions", label: "All Questions" },
  { href: "/departments", label: "All Departments" },
  { href: "/articles", label: "Articles" },
  { href: "/videos", label: "Videos" },
  { href: "/resources", label: "Resources" },
];

const MINISTRY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/about#founder", label: "Founder" },
  { href: "/about#statement-of-faith", label: "Statement of Faith" },
  { href: "/contact", label: "Contact" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-gold-400">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm leading-relaxed text-stone-300 transition hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-brand-800 bg-gradient-to-b from-brand-900 to-[#0a1524] text-stone-200">
      <div className="mx-auto max-w-7xl px-4 py-14 pb-10 sm:px-6 lg:py-16 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Brand — own column, no overlap with link columns */}
          <div className="lg:col-span-4 xl:col-span-4">
            <BrandLogoFooter />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-400">
              {SITE.tagline}
            </p>
          </div>

          {/* Link columns — equal width, aligned grid */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:gap-8 xl:gap-12">
            <FooterColumn
              title="Departments"
              links={departments.slice(0, 5).map((d) => ({
                href: `/departments/${d.slug}`,
                label: d.name,
              }))}
            />
            <FooterColumn title="Explore" links={EXPLORE_LINKS} />
            <FooterColumn title="Ministry" links={MINISTRY_LINKS} />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-brand-700/80 pt-8 text-sm text-stone-400 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>
            Founded by{" "}
            <span className="font-medium text-stone-200">{SITE.founder}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
