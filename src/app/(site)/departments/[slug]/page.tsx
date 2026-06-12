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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <nav className="mb-6 flex items-center gap-1 text-sm text-stone-500">
        <Link href="/" className="hover:text-brand-700">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/departments" className="hover:text-brand-700">
          Departments
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-stone-700">{dept.name}</span>
      </nav>

      <header className="flex flex-col gap-4 rounded-2xl bg-brand-700 p-8 text-white sm:flex-row sm:items-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 text-gold-400">
          <DepartmentIcon name={dept.icon} className="h-8 w-8" />
        </span>
        <div>
          <h1 className="font-serif text-3xl font-bold">{dept.name}</h1>
          <p className="mt-2 max-w-2xl text-stone-200">{dept.description}</p>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="font-serif text-xl font-bold text-stone-900">
          Categories
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {dept.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-xl font-bold text-stone-900">
          Answers in this department
        </h2>
        {deptQuestions.length > 0 ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deptQuestions.map((q) => (
              <QuestionCard key={q.slug} q={q} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
            <p className="font-serif text-lg font-semibold text-stone-800">
              Answers coming soon
            </p>
            <p className="mt-2 text-stone-500">
              This department is being populated. Check back soon or{" "}
              <Link href="/questions" className="text-brand-600 underline">
                browse all questions
              </Link>
              .
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
