"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  HiArrowRightOnRectangle,
  HiBars3,
  HiHome,
  HiTrash,
} from "react-icons/hi2";
import { logout } from "@/app/actions/auth";

type HeaderBarProps = {
  onMenuClick: () => void;
};

export function HeaderBar({ onMenuClick }: HeaderBarProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-zinc-200 bg-white px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <HiBars3 className="h-6 w-6" aria-hidden />
        </button>
      </div>

      <div className="relative flex items-center gap-3" ref={panelRef}>
        <span className="hidden text-sm text-zinc-600 sm:inline">
          Hi{" "}
          <span className="font-medium text-zinc-900">admin@gmail.com</span>
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700 ring-2 ring-white hover:bg-zinc-300 cursor-pointer"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label="Account menu"
        >
          A
        </button>

        {open ? (
          <div
            className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-zinc-200 bg-white py-1 shadow-lg"
            role="menu"
          >
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <HiHome className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
              Home
            </Link>
           
            <div className="my-1 border-t border-zinc-100" />
            <form action={logout} className="block">
              <button
                type="submit"
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                role="menuitem"
              >
                <HiArrowRightOnRectangle className="h-4 w-4 shrink-0" aria-hidden />
                Logout
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </header>
  );
}
