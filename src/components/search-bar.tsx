"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({
  size = "large",
  placeholder = "Search 50,000+ Biblical Questions",
  autoFocus = false,
  defaultValue = "",
  theme = "light",
}: {
  size?: "large" | "small";
  placeholder?: string;
  autoFocus?: boolean;
  defaultValue?: string;
  theme?: "light" | "onDark";
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
    <form
      onSubmit={onSubmit}
      className={`w-full ${theme === "onDark" ? "search-on-dark" : ""}`}
      role="search"
    >
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
          className={`w-full rounded-2xl border bg-white text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${
            theme === "onDark"
              ? "border-white/20 shadow-[0_10px_40px_rgb(0_0_0/0.25)]"
              : "border-stone-200/90 shadow-sm"
          } ${
            large
              ? "py-4 pl-13 pr-32 text-base sm:text-lg"
              : "rounded-xl py-2.5 pl-11 pr-4 text-sm"
          }`}
        />
        {large && (
          <button
            type="submit"
            className="absolute right-2 rounded-xl bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
          >
            Search
          </button>
        )}
      </div>
    </form>
  );
}
