import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin — Sign in",
  description: "Admin panel login",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-zinc-100 px-4 py-16">
      <div className="w-full max-w-[400px] rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Admin
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Use your credentials to access the panel.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
