import Link from "next/link";
import { BookMarked } from "lucide-react";
import { departments } from "@/lib/departments";
import { SITE } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-brand-700 text-stone-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand-700">
                <BookMarked className="h-5 w-5" />
              </span>
              <span className="font-serif text-lg font-bold text-white">
                {SITE.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-stone-300">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-gold-400">
              Departments
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {departments.slice(0, 5).map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/departments/${d.slug}`}
                    className="text-stone-300 transition hover:text-white"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-gold-400">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { href: "/questions", label: "All Questions" },
                { href: "/departments", label: "All Departments" },
                { href: "/articles", label: "Articles" },
                { href: "/videos", label: "Videos" },
                { href: "/resources", label: "Resources" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-stone-300 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-gold-400">
              Ministry
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { href: "/about", label: "About" },
                { href: "/about#founder", label: "Founder" },
                { href: "/about#statement-of-faith", label: "Statement of Faith" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-stone-300 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-brand-600 pt-6 text-sm text-stone-400 sm:flex-row">
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
