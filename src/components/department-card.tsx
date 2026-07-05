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
      className="group card-elevated flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1"
    >
      <div className="p-6">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-600">
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
      </div>
    </Link>
  );
}
