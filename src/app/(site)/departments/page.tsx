import type { Metadata } from "next";
import { DepartmentCard } from "@/components/department-card";
import { departments } from "@/lib/departments";
import { getDepartmentCounts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Departments",
  description:
    "Explore Bible Answer Hub by department: Biblical Studies, Theology, Biblical Languages, Apologetics, Religions & Cults, Church History, Practical Theology, Mission & Ministry, and Contemporary Issues.",
};

export default async function DepartmentsPage() {
  const counts = await getDepartmentCounts();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
          Explore by Field
        </p>
        <h1 className="mt-1 font-serif text-4xl font-bold text-stone-900">
          Departments
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          The library is organized like a theological school — nine departments
          covering the whole field of biblical and theological study.
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => (
          <DepartmentCard key={d.slug} dept={d} count={counts[d.slug] ?? 0} />
        ))}
      </div>
    </div>
  );
}
