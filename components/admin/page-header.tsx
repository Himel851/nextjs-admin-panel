"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBars3 } from "react-icons/hi2";
import { getPageHeaderMeta } from "./nav-config";

type PageHeaderProps = {
  onMenuClick: () => void;
};

export function PageHeader({ onMenuClick }: PageHeaderProps) {
  const pathname = usePathname();
  const { title, breadcrumbs } = getPageHeaderMeta(pathname);

  return (
    <header className="sticky top-0 z-30 shrink-0 border-b border-zinc-200 bg-white">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden cursor-pointer"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <HiBars3 className="h-6 w-6" aria-hidden />
        </button>

        <div className="hidden flex-1 lg:block" aria-hidden />

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-200 text-xs font-semibold text-zinc-600">
              AR
            </span>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-semibold text-zinc-900">
                Adil Rahman
              </p>
              <p className="truncate text-xs text-zinc-500">Admin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
          {title}
        </h1>
        <nav
          aria-label="Breadcrumb"
          className="mt-1 flex flex-wrap items-center gap-1 text-xs text-zinc-500 sm:text-sm"
        >
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={`${crumb.label}-${i}`} className="flex items-center gap-1">
                {i > 0 ? (
                  <span className="text-zinc-400" aria-hidden>
                    &gt;
                  </span>
                ) : null}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="transition hover:text-emerald-700"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-zinc-700" : undefined}>
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
