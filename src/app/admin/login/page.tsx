import type { Metadata } from "next";
import { BookMarked } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from = "/admin" } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <BookMarked className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-serif text-2xl font-bold text-stone-900">
            Bible Answer Hub
          </h1>
          <p className="mt-1 text-sm text-stone-500">Admin Dashboard</p>
        </div>
        <LoginForm from={from} />
      </div>
    </div>
  );
}
