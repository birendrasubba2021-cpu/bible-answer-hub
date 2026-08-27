import type { Metadata } from "next";
import { DepartmentCard } from "@/components/department-card";
import { PageHeader } from "@/components/ui/page-header";
import { departments } from "@/lib/departments";
import { getDepartmentCounts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Departments",
  description:
    "Nine departments of biblical and theological study — from Biblical Studies to Contemporary Issues.",
};

export default async function DepartmentsPage() {
  const counts = await getDepartmentCounts();
  return (
    <div className="bg-stone-50/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <PageHeader
          eyebrow="Classification"
          title="Departments"
          subtitle="The reference library is organized into nine fields of study, structured as in a theological curriculum."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <DepartmentCard key={d.slug} dept={d} count={counts[d.slug] ?? 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
