import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Library } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { QuestionCard, QuestionRow } from "@/components/question-card";
import { DepartmentCard } from "@/components/department-card";
import { ArticleCard } from "@/components/article/article-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { BrandedThumbnail } from "@/components/ui/branded-thumbnail";
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
      <section className="relative overflow-hidden border-b border-brand-800 bg-brand-900 text-white">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,176,74,0.12),_transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/logo-icon.svg"
                  alt=""
                  width={44}
                  height={44}
                  unoptimized
                  className="rounded-lg bg-white/95 p-1.5 shadow-md"
                />
                <div>
                  <p className="font-sans text-sm font-extrabold uppercase tracking-[0.08em] text-white">
                    Bible Answer Hub
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-400">
                    Theological Reference
                  </p>
                </div>
              </div>

              <h1 className="mt-8 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
                Biblical answers for questions of faith, theology, and Christian
                life
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg">
                A structured reference work of Scripture-based Q&amp;A and
                scholarly articles — prepared by {SITE.founder} (B.Th., M.Div.,
                M.Th.).
              </p>

              <div className="mt-8 max-w-xl">
                <SearchBar
                  theme="onDark"
                  placeholder="Search the theological library..."
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-stone-400">Examples:</span>
                {EXAMPLES.map((ex) => (
                  <Link
                    key={ex}
                    href={`/search?q=${encodeURIComponent(ex)}`}
                    className="rounded border border-white/15 bg-white/5 px-2.5 py-1 text-stone-200 transition hover:border-gold-400/40 hover:text-white"
                  >
                    {ex}
                  </Link>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/questions" className="btn-primary">
                  <BookOpen className="h-4 w-4" /> Browse Questions
                </Link>
                <Link href="/articles" className="btn-secondary">
                  <Library className="h-4 w-4" /> Read Articles
                </Link>
              </div>
            </div>

            {featured && (
              <Link
                href={`/questions/${featured.slug}`}
                className="group scholarly-card overflow-hidden bg-white shadow-2xl ring-1 ring-white/10"
              >
                <BrandedThumbnail
                  departmentSlug={featured.department}
                  featuredImage={featured.featuredImage}
                  label="Featured answer"
                  caption={featured.biblicalBasis?.[0]?.reference}
                  captionMeta={featured.biblicalBasis?.[0]?.version}
                  title={featured.question}
                  category={featured.category}
                  topics={featured.topics}
                  size="hero"
                />
                <div className="border-t border-border bg-white p-6 sm:p-7">
                  <h2 className="font-display text-xl font-bold leading-snug text-stone-900 group-hover:text-brand-700 sm:text-2xl">
                    {featured.question}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-600">
                    {featured.shortAnswer}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Read full answer <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            )}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {[
              { value: SITE.totalQuestionsGoal, label: "Answers (goal)" },
              { value: `${departments.length}`, label: "Departments" },
              { value: `${categoryCount}`, label: "Categories" },
              { value: "Open access", label: "No charge" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-brand-900/80 px-4 py-5 text-center backdrop-blur-sm sm:px-5"
              >
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Reference"
            title="Frequently Consulted Questions"
            subtitle="Selected answers addressing doctrine, Scripture, apologetics, and contemporary issues."
            href="/questions"
            linkLabel="Full question index"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((q) => (
              <QuestionCard key={q.slug} q={q} />
            ))}
          </div>
        </div>
      </section>

      {articles.length > 0 && (
        <section className="border-b border-border bg-stone-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Articles"
              title="Scholarly Articles"
              subtitle="Extended biblical and theological studies for careful reading."
              href="/articles"
              linkLabel="All articles"
            />

            {featuredArticle && moreArticles.length > 0 ? (
              <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <Link
                  href={`/articles/${featuredArticle.slug}`}
                  className="group scholarly-card overflow-hidden bg-white"
                >
                  {featuredArticle.featuredImg ? (
                    <div className="relative h-64 sm:h-80">
                      <Image
                        src={featuredArticle.featuredImg}
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-300">
                          Featured article
                        </span>
                        <h3 className="mt-2 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                          {featuredArticle.title}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    <BrandedThumbnail
                      departmentSlug="biblical-studies"
                      label="Featured article"
                      caption={featuredArticle.title}
                      title={featuredArticle.title}
                      topics={featuredArticle.tags}
                      size="hero"
                    />
                  )}
                  <div className="border-t border-border p-6 sm:p-7">
                    <p className="line-clamp-2 text-sm leading-relaxed text-stone-600">
                      {featuredArticle.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      Read article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
                <div className="grid gap-6">
                  {moreArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="border-b border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Classification"
            title="Departments"
            subtitle="Nine fields of study — from biblical studies to contemporary issues."
            href="/departments"
            linkLabel="Department index"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <DepartmentCard key={d.slug} dept={d} count={counts[d.slug] ?? 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_1.1fr]">
            <SectionHeading
              eyebrow="Updates"
              title="Recently Published"
              subtitle="The latest additions to the reference library."
              href="/questions"
              linkLabel="Browse all"
            />
            <div className="scholarly-card divide-y divide-border bg-white px-1 py-1">
              {recent.map((q) => (
                <QuestionRow key={q.slug} q={q} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <Image
              src="/logo-icon.svg"
              alt=""
              width={88}
              height={88}
              unoptimized
              className="mx-auto rounded-2xl bg-brand-50 p-3 ring-1 ring-brand-100 md:mx-0"
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">
                Editor &amp; Founder
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-stone-900">
                {SITE.founder}
              </h2>
              <p className="mt-3 leading-relaxed text-stone-600">
                Apologist, Bible teacher, and theological educator. Holding a
                Bachelor of Theology (B.Th.), Master of Divinity (M.Div.), and
                Master of Theology in New Testament (M.Th.).
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Biography &amp; statement of faith <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="ornament-line mx-auto mb-8 w-32" />
          <h2 className="font-display text-3xl font-bold text-stone-900">
            Search the library
          </h2>
          <p className="mt-3 text-stone-600">
            {totalQuestions}+ published answers — with more added regularly.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar placeholder="Enter a biblical or theological question..." />
          </div>
        </div>
      </section>
    </>
  );
}
