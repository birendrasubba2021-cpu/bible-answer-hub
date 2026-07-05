import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Library,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { QuestionCard } from "@/components/question-card";
import { ArticleCard } from "@/components/article/article-card";
import { DepartmentCard } from "@/components/department-card";
import { departments } from "@/lib/departments";
import {
  getDepartmentCounts,
  getQuestionCount,
  getRecentQuestions,
  getRecentArticles,
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
  const [trending, recent, articles, counts, totalQuestions] = await Promise.all([
    getTrendingQuestions(6),
    getRecentQuestions(3),
    getRecentArticles(3),
    getDepartmentCounts(),
    getQuestionCount(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,176,74,0.14),_transparent_55%)]" />
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-stone-200">
              <Sparkles className="h-3.5 w-3.5 text-gold-400" />
              Trusted biblical Q&amp;A
            </span>
            <h1 className="mt-8 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              Scholarly Answers to
              <span className="mt-2 block bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                Every Question of Faith
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-300">
              Scripture-grounded answers on theology, apologetics, church history,
              Christian living, and contemporary issues — written for pastors,
              students, and seekers.
            </p>

            <div className="mx-auto mt-9 max-w-2xl">
              <SearchBar />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-stone-400">Try:</span>
              {EXAMPLES.slice(0, 4).map((ex) => (
                <Link
                  key={ex}
                  href={`/search?q=${encodeURIComponent(ex)}`}
                  className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-stone-200 transition hover:border-gold-400/50 hover:text-white"
                >
                  {ex}
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/questions" className="btn-primary">
                <BookOpen className="h-4 w-4" /> Explore Answers
              </Link>
              <Link href="/articles" className="btn-secondary">
                <Library className="h-4 w-4" /> Read Articles
              </Link>
              <Link href="/departments" className="btn-secondary">
                Browse Departments
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { value: SITE.totalQuestionsGoal, label: "Questions (goal)" },
              { value: `${departments.length}`, label: "Departments" },
              {
                value: `${departments.reduce((n, d) => n + d.categories.length, 0)}`,
                label: "Categories",
              },
              { value: "Free", label: "Always open" },
            ].map((s) => (
              <div
                key={s.label}
                className="stat-pill rounded-2xl px-4 py-4 text-center sm:px-5 sm:py-5"
              >
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="section-band">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-5 text-sm text-stone-600 sm:px-6">
          {[
            { icon: ShieldCheck, text: "Biblical & scholarly" },
            { icon: GraduationCap, text: "Founded by a theologian (B.Th., M.Div., M.Th.)" },
            { icon: BookOpen, text: "Structured like a theological library" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4 text-brand-600" />
              {text}
            </span>
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

      {/* Featured articles */}
      {articles.length > 0 && (
        <section className="border-y border-border bg-gradient-to-b from-stone-50 to-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Long-Form Teaching"
              title="Featured Articles"
              subtitle="In-depth biblical and theological articles for serious study."
              href="/articles"
              linkLabel="All articles"
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

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
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(212,176,74,0.12),_transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-brand-900 shadow-lg ring-4 ring-white/10">
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
                className="btn-primary mt-5"
              >
                Read more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="Start here"
          title="Have a question about the Bible?"
          subtitle={`Search ${totalQuestions}+ answers and growing — built to become the world's largest biblical Q&A library.`}
        />
        <div className="mx-auto mt-8 max-w-xl">
          <SearchBar />
        </div>
      </section>
    </>
  );
}
