import Link from "next/link";
import type { Department } from "@/lib/types";
import { DepartmentIcon } from "./department-icon";

export function DepartmentCard({
  dept,
  count = 0,
}: {
  dept: Department;
  count?: number;
}) {
  return (
    <Link
      href={`/departments/${dept.slug}`}
      className="group flex flex-col rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md"
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
        <DepartmentIcon name={dept.icon} className="h-6 w-6" />
      </span>
      <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-brand-700">
        {dept.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
        {dept.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-400">
        <span className="font-medium text-stone-500">
          {dept.categories.length} categories
        </span>
        <span aria-hidden>•</span>
        <span>{count > 0 ? `${count} answers` : "Coming soon"}</span>
      </div>
    </Link>
  );
}
