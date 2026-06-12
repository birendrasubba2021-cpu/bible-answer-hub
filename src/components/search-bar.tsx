"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({
  size = "large",
  placeholder = "Search 50,000+ Biblical Questions",
  autoFocus = false,
  defaultValue = "",
}: {
  size?: "large" | "small";
  placeholder?: string;
  autoFocus?: boolean;
  defaultValue?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  const large = size === "large";

  return (
    <form onSubmit={onSubmit} className="w-full" role="search">
      <div className="relative flex items-center">
        <Search
          className={`pointer-events-none absolute left-4 text-stone-400 ${
            large ? "h-6 w-6" : "h-5 w-5"
          }`}
        />
        <input
          type="search"
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search questions"
          className={`w-full rounded-xl border border-stone-200/80 bg-white text-stone-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200/80 ${
            large
              ? "py-4 pl-13 pr-32 text-lg shadow-md"
              : "py-2.5 pl-11 pr-4 text-sm"
          }`}
        />
        {large && (
          <button
            type="submit"
            className="absolute right-2 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Search
          </button>
        )}
      </div>
    </form>
  );
}
