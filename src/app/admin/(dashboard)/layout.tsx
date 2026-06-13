import type { Metadata } from "next";
import Link from "next/link";
import { BookMarked, FileText, LayoutDashboard, ListChecks, LogOut, Plus, ExternalLink } from "lucide-react";
import { logout } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/questions", label: "Questions", icon: ListChecks },
  { href: "/admin/questions/new", label: "New Question", icon: Plus },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/articles/new", label: "New Article", icon: Plus },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-100 lg:flex">
      <aside className="flex flex-col border-b border-stone-200 bg-brand-700 text-stone-200 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand-700">
            <BookMarked className="h-5 w-5" />
          </span>
          <div>
            <p className="font-serif text-base font-bold text-white">
              Bible Answer Hub
            </p>
            <p className="text-xs text-stone-300">Admin</p>
          </div>
        </div>

        <nav className="flex flex-row gap-1 px-3 pb-3 lg:flex-1 lg:flex-col lg:pb-0">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-200 transition hover:bg-brand-600 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 px-3 pb-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-300 transition hover:bg-brand-600 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">View site</span>
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-300 transition hover:bg-brand-600 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-5 sm:p-8">{children}</main>
    </div>
  );
}
