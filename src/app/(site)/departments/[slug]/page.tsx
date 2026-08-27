import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { DepartmentIcon } from "@/components/department-icon";
import { QuestionCard } from "@/components/question-card";
import { departments, getDepartment } from "@/lib/departments";
import { getQuestionsByDepartment } from "@/lib/content";

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) return { title: "Department not found" };
  return {
    title: dept.name,
    description: dept.description,
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) notFound();

  const deptQuestions = await getQuestionsByDepartment(slug);

  return (
    <div className="bg-stone-50/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-1 text-sm text-stone-500">
          <Link href="/" className="transition hover:text-brand-700">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/departments" className="transition hover:text-brand-700">
            Departments
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-stone-700">{dept.name}</span>
        </nav>

        <header className="scholarly-card overflow-hidden bg-white">
          <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-start sm:p-10">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700">
              <DepartmentIcon name={dept.icon} className="h-8 w-8" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700">
                Department
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                {dept.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600">
                {dept.description}
              </p>
            </div>
          </div>
        </header>

        <section className="mt-12">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700">
            Categories
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {dept.categories.map((cat) => (
              <span
                key={cat}
                className="rounded border border-border bg-white px-3 py-1.5 text-sm text-stone-700"
              >
                {cat}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-stone-900">
            Published Answers
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Reference entries in this department.
          </p>
          {deptQuestions.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {deptQuestions.map((q) => (
                <QuestionCard key={q.slug} q={q} />
              ))}
            </div>
          ) : (
            <div className="scholarly-card mt-6 border-dashed bg-white p-12 text-center">
              <p className="font-display text-xl font-semibold text-stone-800">
                Entries forthcoming
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                This department is being populated. Consult the{" "}
                <Link href="/questions" className="font-semibold text-brand-700">
                  full question index
                </Link>{" "}
                in the meantime.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
