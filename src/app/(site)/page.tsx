import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { QuestionCard } from "@/components/question-card";
import { DepartmentCard } from "@/components/department-card";
import { departments } from "@/lib/departments";
import {
  getDepartmentCounts,
  getQuestionCount,
  getRecentQuestions,
  getTrendingQuestions,
  SITE,
} from "@/lib/content";

const EXAMPLES = [
  "What is the Trinity?",
  "What is speaking in tongues?",
  "Is the prosperity gospel biblical?",
  "What is Calvinism?",
  "Who is Jesus Christ?",
];

export default async function Home() {
  const [trending, recent, counts, totalQuestions] = await Promise.all([
    getTrendingQuestions(6),
    getRecentQuestions(3),
    getDepartmentCounts(),
    getQuestionCount(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.18),_transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-stone-200">
            <Sparkles className="h-4 w-4 text-gold-400" />
            Building the world&apos;s largest biblical knowledge base
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-[3.25rem]">
            Trusted Answers to Every
            <span className="mt-1 block bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
              Question of Faith
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-300">
            Find biblical, scholarly answers about Scripture, theology,
            apologetics, church history, Christian living, biblical languages,
            ministry, and more.
          </p>

          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBar />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-stone-300">Try:</span>
            {EXAMPLES.map((ex) => (
              <Link
                key={ex}
                href={`/search?q=${encodeURIComponent(ex)}`}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-stone-200 transition hover:border-gold-400 hover:text-white"
              >
                {ex}
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/questions"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
            >
              <BookOpen className="h-4 w-4" /> Explore Answers
            </Link>
            <Link
              href="/departments"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse Departments
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Read Articles
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <PlayCircle className="h-4 w-4" /> Watch Videos
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 py-8 text-center sm:grid-cols-4 sm:px-6">
          {[
            { value: SITE.totalQuestionsGoal, label: "Questions (goal)" },
            { value: `${departments.length}`, label: "Departments" },
            {
              value: `${departments.reduce((n, d) => n + d.categories.length, 0)}`,
              label: "Categories",
            },
            { value: "Free", label: "Always accessible" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl font-bold text-brand-700">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-stone-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Questions */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Most Asked"
          title="Trending Questions"
          subtitle="The questions believers and churches are wrestling with right now."
          href="/questions"
          linkLabel="View all questions"
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((q) => (
            <QuestionCard key={q.slug} q={q} />
          ))}
        </div>
      </section>

      {/* Departments */}
      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Explore by Field"
            title="Departments"
            subtitle="From biblical studies to contemporary issues — structured like a theological library."
            href="/departments"
            linkLabel="See all departments"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <DepartmentCard key={d.slug} dept={d} count={counts[d.slug] ?? 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently added */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Fresh Content"
          title="Recently Added"
          subtitle="New answers added to the library."
          href="/questions"
          linkLabel="Browse library"
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((q) => (
            <QuestionCard key={q.slug} q={q} />
          ))}
        </div>
      </section>

      {/* About founder */}
      <section className="bg-brand-700 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gold-500 text-brand-900">
              <GraduationCap className="h-14 w-14" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">
                About the Founder
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold">
                {SITE.founder}
              </h2>
              <p className="mt-3 leading-relaxed text-stone-200">
                Apologist, Bible teacher, and theological educator. Holding a
                Bachelor of Theology (B.Th.), Master of Divinity (M.Div.), and a
                Master of Theology in New Testament (M.Th.), he founded Bible
                Answer Hub to make trustworthy, biblical answers accessible to
                the whole church.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-stone-100"
              >
                Read more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-bold text-stone-900">
          Have a question about the Bible?
        </h2>
        <p className="mt-3 text-stone-600">
          Search {totalQuestions}+ answers and growing — built to become the
          world&apos;s largest biblical Q&amp;A library.
        </p>
        <div className="mx-auto mt-6 max-w-xl">
          <SearchBar />
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
          {eyebrow}
        </p>
        <h2 className="mt-1 font-serif text-3xl font-bold text-stone-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-stone-600">{subtitle}</p>
        )}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 hover:text-brand-700"
        >
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
