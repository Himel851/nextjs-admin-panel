"use client";

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { login, type LoginState } from "@/app/actions/auth";

const initial: LoginState = undefined;

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initial);

  useEffect(() => {
    if (state?.error)
      toast.error(state.error, { toastId: "login-error" });
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state?.error ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-medium text-zinc-700">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 shadow-sm outline-none ring-zinc-400 transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2"
          placeholder="admin"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-zinc-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 shadow-sm outline-none ring-zinc-400 transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-1 flex h-11 items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
