import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Bible Answer Hub.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
        Get in touch
      </p>
      <h1 className="mt-1 font-serif text-4xl font-bold text-stone-900">
        Contact Us
      </h1>
      <p className="mt-2 text-stone-600">
        Have a question, correction, or suggestion? Send us a message.
      </p>

      <form className="mt-8 space-y-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <Field label="Name">
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </Field>
        <Field label="Subject">
          <input
            type="text"
            name="subject"
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </Field>
        <Field label="Message">
          <textarea
            name="message"
            rows={5}
            required
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </Field>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <Mail className="h-4 w-4" /> Send Message
        </button>
        <p className="text-xs text-stone-400">
          Note: this form is a placeholder UI. Wiring it to email/database is a
          later phase.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-stone-700">
        {label}
      </span>
      {children}
    </label>
  );
}
