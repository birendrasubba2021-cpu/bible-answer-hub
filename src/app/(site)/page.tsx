import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  GraduationCap,
  Heart,
  Library,
  ShieldCheck,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { QuestionCard, QuestionRow } from "@/components/question-card";
import { DepartmentCard } from "@/components/department-card";
import { ArticleCard } from "@/components/article/article-card";
import { SectionHeading } from "@/components/ui/section-heading";
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
];

const METHOD = [
  {
    icon: BookMarked,
    title: "Scripture first",
    text: "Every answer begins with the biblical text — not trends, personalities, or private opinion.",
  },
  {
    icon: GraduationCap,
    title: "Scholarly & clear",
    text: "Theology, history, and languages are used to serve the church, not to obscure the gospel.",
  },
  {
    icon: Heart,
    title: "For the whole church",
    text: "Written for pastors, students, and seekers — pastoral in tone, careful in doctrine.",
  },
] as const;

export default async function Home() {
  const [trending, recent, articles, counts, totalQuestions] = await Promise.all([
    getTrendingQuestions(6),
    getRecentQuestions(4),
    getRecentArticles(3),
    getDepartmentCounts(),
    getQuestionCount(),
  ]);

  const featured = trending[0];
  const featuredArticle = articles[0];
  const moreArticles = articles.slice(1);
  const categoryCount = departments.reduce((n, d) => n + d.categories.length, 0);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,176,74,0.16),_transparent_52%)]" />
        <div className="absolute -right-32 top-16 h-[28rem] w-[28rem] rounded-full bg-brand-600/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-stone-200">
                A theological library for the church
              </span>
              <h1 className="mt-7 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.35rem]">
                Trusted answers to
                <span className="mt-2 block bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                  every question of faith
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
                Scripture-grounded Q&amp;A on theology, apologetics, church
                history, and the issues the church faces today — written by{" "}
                {SITE.founder}.
              </p>

              <div className="mt-8 max-w-xl">
                <SearchBar
                  theme="onDark"
                  placeholder="Search biblical questions..."
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-stone-400">Try:</span>
                {EXAMPLES.map((ex) => (
                  <Link
                    key={ex}
                    href={`/search?q=${encodeURIComponent(ex)}`}
                    className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-stone-200 transition hover:border-gold-400/50 hover:text-white"
                  >
                    {ex}
                  </Link>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/questions" className="btn-primary">
                  <BookOpen className="h-4 w-4" /> Explore Answers
                </Link>
                <Link href="/articles" className="btn-secondary">
                  <Library className="h-4 w-4" /> Read Articles
                </Link>
                <Link href="/departments" className="btn-ghost">
                  Browse departments <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              {featured ? (
                <Link
                  href={`/questions/${featured.slug}`}
                  className="group block rounded-3xl border border-white/12 bg-white/6 p-6 shadow-[0_20px_60px_rgb(0_0_0/0.28)] backdrop-blur-sm transition hover:border-gold-400/40 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
                      Featured answer
                    </span>
                    <span className="rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-300">
                      Most asked
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-white group-hover:text-gold-300">
                    {featured.question}
                  </h2>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-stone-300">
                    {featured.shortAnswer}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 transition group-hover:gap-2.5">
                    Read the full answer <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ) : null}

              <blockquote className="mt-5 rounded-2xl border border-white/10 bg-brand-800/50 px-5 py-4">
                <p className="font-serif text-[0.95rem] leading-relaxed text-stone-200 italic">
                  Always be prepared to give an answer to everyone who asks you
                  to give the reason for the hope that you have.
                </p>
                <footer className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
                  1 Peter 3:15
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { value: SITE.totalQuestionsGoal, label: "Questions (goal)" },
              { value: `${departments.length}`, label: "Departments" },
              { value: `${categoryCount}`, label: "Categories" },
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

      <section className="section-band">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-5 text-sm text-stone-600 sm:px-6">
          {[
            { icon: ShieldCheck, text: "Biblical & scholarly" },
            {
              icon: GraduationCap,
              text: "Founded by a theologian (B.Th., M.Div., M.Th.)",
            },
            { icon: BookOpen, text: "Structured like a theological library" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4 text-brand-600" />
              {text}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="How we answer"
          title="A library, not a feed"
          subtitle="Bible Answer Hub is built as a theological library — careful, searchable, and written to last."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {METHOD.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-light text-gold-600">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-stone-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-gradient-to-b from-stone-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Most asked"
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
        </div>
      </section>

      {articles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Long-form teaching"
            title="Featured Articles"
            subtitle="In-depth biblical and theological articles for serious study."
            href="/articles"
            linkLabel="All articles"
          />

          {featuredArticle && moreArticles.length > 0 ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <Link
                href={`/articles/${featuredArticle.slug}`}
                className="group card-elevated relative overflow-hidden"
              >
                <div className="relative h-64 sm:h-80">
                  {featuredArticle.featuredImg ? (
                    <Image
                      src={featuredArticle.featuredImg}
                      alt=""
                      fill
                      priority
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-900" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <span className="rounded-md bg-gold-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-900">
                      Featured article
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold leading-snug sm:text-3xl">
                      {featuredArticle.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-stone-200">
                      {featuredArticle.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
                      Read article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
              <div className="grid gap-5">
                {moreArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </section>
      )}

      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Explore by field"
            title="Departments"
            subtitle="From biblical studies to contemporary issues — structured like a theological library."
            href="/departments"
            linkLabel="See all departments"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <DepartmentCard
                key={d.slug}
                dept={d}
                count={counts[d.slug] ?? 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr]">
          <SectionHeading
            eyebrow="Fresh content"
            title="Recently Added"
            subtitle="New answers added to the library."
            href="/questions"
            linkLabel="Browse library"
          />
          <div className="divide-y divide-border rounded-2xl border border-border bg-white px-2 py-2">
            {recent.map((q) => (
              <QuestionRow key={q.slug} q={q} />
            ))}
          </div>
        </div>
      </section>

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
              <Link href="/about" className="btn-primary mt-5">
                Read more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="ornament-line mx-auto mb-8 w-40" />
        <SectionHeading
          align="center"
          eyebrow="Start here"
          title="Have a question about the Bible?"
          subtitle={`Search ${totalQuestions}+ answers and growing — built to become the world's largest biblical Q&A library.`}
        />
        <div className="mx-auto mt-8 max-w-xl">
          <SearchBar placeholder="Ask a biblical question..." />
        </div>
      </section>
    </>
  );
}
