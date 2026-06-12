import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Bible Answer Hub and its founder, Apologist Birendra Subba — mission, vision, and statement of faith.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
        About
      </p>
      <h1 className="mt-1 font-serif text-4xl font-bold text-stone-900">
        About {SITE.name}
      </h1>

      <div className="prose-answer mt-6">
        <p>
          {SITE.name} is a global biblical knowledge platform dedicated to
          providing trustworthy, scholarly, biblical, and accessible answers to
          questions related to Scripture, theology, apologetics, church history,
          Christian living, ministry, biblical languages, world religions,
          philosophy, counseling, ethics, and contemporary issues.
        </p>
      </div>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Mission
          </h2>
          <p className="mt-2 leading-relaxed text-stone-600">
            To make trustworthy, biblical answers accessible to the whole
            church and the watching world.
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Vision
          </h2>
          <p className="mt-2 leading-relaxed text-stone-600">
            To develop the world&apos;s largest online Christian theological
            knowledge base — {SITE.totalQuestionsGoal} biblical questions and
            answers, articles, videos, and study resources.
          </p>
        </div>
      </section>

      <section id="statement-of-faith" className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Statement of Faith
        </h2>
        <ul className="prose-answer mt-4 space-y-2">
          <li>We believe the Bible is the inspired, authoritative Word of God.</li>
          <li>We believe in one God eternally existing in three persons.</li>
          <li>
            We believe in the deity, virgin birth, atoning death, and bodily
            resurrection of Jesus Christ.
          </li>
          <li>We believe salvation is by grace alone, through faith alone, in Christ alone.</li>
          <li>We believe in the work of the Holy Spirit and the church&apos;s mission.</li>
        </ul>
      </section>

      <section id="founder" className="mt-12 rounded-2xl bg-brand-700 p-8 text-white">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gold-500 text-brand-900">
            <GraduationCap className="h-12 w-12" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">
              Founder
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold">
              {SITE.founder}
            </h2>
            <p className="mt-3 leading-relaxed text-stone-200">
              Apologist, Bible teacher, and theological educator committed to
              equipping the church with sound, biblical answers.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-stone-200">
              <li>• Bachelor of Theology (B.Th.)</li>
              <li>• Master of Divinity (M.Div.)</li>
              <li>• Master of Theology in New Testament (M.Th.)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
