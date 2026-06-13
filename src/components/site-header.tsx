"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { SearchBar } from "./search-bar";

const NAV = [
  { href: "/questions", label: "Questions" },
  { href: "/departments", label: "Departments" },
  { href: "/articles", label: "Articles" },
  { href: "/videos", label: "Videos" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
        <div className="shrink-0">
          <BrandLogo />
        </div>

        <nav className="hidden items-center gap-0.5 lg:flex xl:ml-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden w-48 lg:block xl:w-56">
          <SearchBar size="small" placeholder="Search..." />
        </div>

        <Link
          href="/contact"
          className="hidden shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 md:inline-flex"
        >
          Contact
        </Link>

        <button
          className="ml-auto shrink-0 rounded-lg p-2 text-stone-700 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-4 py-4 lg:hidden">
          <SearchBar size="small" placeholder="Search questions..." />
          <nav className="mt-3 flex flex-col">
            {[...NAV, { href: "/contact", label: "Contact" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
