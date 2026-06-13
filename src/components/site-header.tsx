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
    <header className="sticky top-0 z-50 border-b border-border/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <BrandLogo height={40} />

        <nav className="ml-auto hidden items-center gap-0.5 xl:flex">
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

        <div className="ml-auto hidden w-56 xl:block 2xl:w-64">
          <SearchBar size="small" placeholder="Search..." />
        </div>

        <Link
          href="/contact"
          className="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 lg:inline-flex"
        >
          Contact
        </Link>

        <button
          className="ml-auto rounded-lg p-2 text-stone-700 xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-paper px-4 py-4 xl:hidden">
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
