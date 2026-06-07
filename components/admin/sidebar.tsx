"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  HiArrowRightOnRectangle,
  HiChevronDown,
  HiCog6Tooth,
  HiFolder,
  HiPhoto,
  HiXMark,
} from "react-icons/hi2";
import { logout } from "@/app/actions/auth";
import { BiobuildLogo } from "./biobuild-logo";
import { adminNav, type NavItem } from "./nav-config";

const iconMap: Record<NavItem["icon"], IconType> = {
  slider: HiPhoto,
  projects: HiFolder,
  setting: HiCog6Tooth,
  dashboard: HiFolder,
};

function NavIcon({ item }: { item: NavItem }) {
  const I = iconMap[item.icon];
  return <I className="h-5 w-5 shrink-0" aria-hidden />;
}

type SidebarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const next: Record<string, boolean> = {};
    for (const item of adminNav) {
      if (!item.children) continue;
      const childActive = item.children.some(
        (c) => pathname === c.href || pathname.startsWith(`${c.href}/`)
      );
      if (childActive) next[item.label] = true;
    }
    setOpenGroups((prev) => ({ ...prev, ...next }));
  }, [pathname]);

  const toggleGroup = (label: string) => {
    setOpenGroups((p) => ({ ...p, [label]: !p[label] }));
  };

  const linkClass = (active: boolean) =>
    active
      ? "bg-emerald-50 font-medium text-emerald-700"
      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900";

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onMobileClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[260px] max-w-[85vw] flex-col border-r border-zinc-200 bg-white shadow-xl transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:z-0 lg:h-dvh lg:max-w-none lg:shrink-0 lg:self-start lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 px-4 py-4">
          <BiobuildLogo onClick={onMobileClose} />
          <button
            type="button"
            onClick={onMobileClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 lg:hidden cursor-pointer"
            aria-label="Close menu"
          >
            <HiXMark className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {adminNav.map((item) => {
              if (item.href && !item.children) {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onMobileClose}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${linkClass(active)}`}
                    >
                      <NavIcon item={item} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              }

              if (item.children) {
                const expanded = openGroups[item.label] ?? false;
                const groupActive =
                  item.children.some(
                    (c) =>
                      pathname === c.href ||
                      pathname.startsWith(`${c.href}/`)
                  ) ||
                  (item.href &&
                    (pathname === item.href ||
                      pathname.startsWith(`${item.href}/`)));

                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => toggleGroup(item.label)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition cursor-pointer ${linkClass(!!groupActive)}`}
                    >
                      <NavIcon item={item} />
                      <span className="truncate">{item.label}</span>
                      <HiChevronDown
                        className={`ml-auto h-4 w-4 shrink-0 text-zinc-400 transition ${
                          expanded ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>
                    {expanded ? (
                      <ul className="mt-1 space-y-0.5 pl-4">
                        {item.children.map((child) => {
                          const active =
                            pathname === child.href ||
                            pathname.startsWith(`${child.href}/`);
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onMobileClose}
                                className={`block rounded-lg px-3 py-2 text-sm transition ${
                                  active
                                    ? "font-medium text-emerald-700"
                                    : "text-zinc-500 hover:text-emerald-700"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </nav>

        <div className="mt-auto shrink-0 border-t border-zinc-100 bg-white p-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-white">
              JD
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-900">
                John Doe
              </p>
              <p className="truncate text-xs text-zinc-500">
                john@example.com
              </p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 cursor-pointer"
            >
              <HiArrowRightOnRectangle className="h-4 w-4" aria-hidden />
              Log Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
