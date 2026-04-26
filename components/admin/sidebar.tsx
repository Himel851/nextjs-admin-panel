"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  HiCheckCircle,
  HiChevronDown,
  HiChevronRight,
  HiClipboardDocumentList,
  HiSquares2X2,
  HiXMark,
} from "react-icons/hi2";
import { LuPanelLeft } from "react-icons/lu";
import { adminNav, type NavItem } from "./nav-config";

const iconMap: Record<NavItem["icon"], IconType> = {
  dashboard: HiSquares2X2,
  orders: HiSquares2X2,
  clipboard: HiClipboardDocumentList,
  confirm: HiCheckCircle,
  settings: HiSquares2X2,
};

function NavIcon({ item }: { item: NavItem }) {
  const I = iconMap[item.icon];
  return <I className="h-5 w-5 shrink-0 opacity-90" aria-hidden />;
}

type SidebarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export function Sidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
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

  const asideWidth = collapsed ? "lg:w-[4.5rem]" : "lg:w-60";

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
        className={`fixed inset-y-0 left-0 z-50 flex min-h-0 w-60 max-w-[85vw] flex-col border-r border-slate-800 bg-slate-900 text-slate-100 shadow-xl transition-[transform,width] duration-200 ease-out max-lg:h-dvh lg:static lg:z-0 lg:max-h-none lg:min-h-0 lg:max-w-none lg:translate-x-0 lg:self-stretch lg:shadow-none ${asideWidth} -translate-x-full max-lg:min-h-dvh ${
          mobileOpen ? "translate-x-0" : ""
        }`}
      >
        <div
          className={`flex shrink-0 items-center gap-2 border-b border-slate-800 px-3 py-3 lg:min-h-14 lg:py-0 ${
            collapsed ? "lg:flex-col lg:justify-center lg:gap-2 lg:py-3" : "lg:justify-between"
          }`}
        >
          <Link
            href="/"
            className={`flex min-w-0 items-center gap-2 font-semibold tracking-tight text-white ${
              collapsed ? "lg:justify-center" : ""
            }`}
            onClick={onMobileClose}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold text-white">
              A
            </span>
            <span
              className={`truncate text-sm uppercase sm:text-base ${
                collapsed ? "lg:sr-only" : ""
              }`}
            >
              Admin
            </span>
          </Link>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:inline-flex cursor-pointer"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <LuPanelLeft
              className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          <button
            type="button"
            onClick={onMobileClose}
            className="ml-auto rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <HiXMark className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-2 py-3">
          <ul className="flex flex-col gap-0.5 pb-4">
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
                      className={`flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm transition ${
                        active
                          ? "bg-slate-800 text-white"
                          : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      } ${collapsed ? "lg:justify-center lg:px-2" : ""}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <NavIcon item={item} />
                      <span className={`truncate ${collapsed ? "lg:sr-only" : ""}`}>
                        {item.label}
                      </span>
                      {!collapsed && (
                        <HiChevronRight className="ml-auto h-4 w-4 shrink-0 opacity-50" aria-hidden />
                      )}
                    </Link>
                  </li>
                );
              }

              if (item.children) {
                const expanded = openGroups[item.label] ?? false;
                const groupActive = item.children.some(
                  (c) =>
                    pathname === c.href || pathname.startsWith(`${c.href}/`)
                );
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => toggleGroup(item.label)}
                      className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-sm transition cursor-pointer ${
                        groupActive
                          ? "bg-slate-800/60 text-white"
                          : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      } ${collapsed ? "lg:justify-center lg:px-2" : ""}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <NavIcon item={item} />
                      <span className={`truncate ${collapsed ? "lg:sr-only" : ""}`}>
                        {item.label}
                      </span>
                      {!collapsed && (
                        <HiChevronDown
                          className={`ml-auto h-4 w-4 shrink-0 opacity-70 transition ${
                            expanded ? "rotate-180" : ""
                          }`}
                          aria-hidden
                        />
                      )}
                    </button>
                    {!collapsed && expanded && (
                      <ul className="mt-0.5 ml-4 border-l border-slate-700 pl-3">
                        {item.children.map((child) => {
                          const active = pathname === child.href;
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onMobileClose}
                                className={`block rounded-md px-2 py-2 text-sm transition ${
                                  active
                                    ? "bg-indigo-600/30 font-medium text-white"
                                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
