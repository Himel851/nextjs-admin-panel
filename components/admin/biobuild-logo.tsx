import Link from "next/link";

type BiobuildLogoProps = {
  onClick?: () => void;
};

export function BiobuildLogo({ onClick }: BiobuildLogoProps) {
  return (
    <Link
      href="/dashboard"
      onClick={onClick}
      className="flex min-w-0 items-center gap-2.5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          aria-hidden
        >
          <path
            d="M4 20V9l8-5 8 5v11"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M9 20v-6h6v6M9 11h6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-sm font-bold tracking-wide text-zinc-900">
          BIOBUILD
        </span>
        <span className="block truncate text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Development Ltd
        </span>
      </span>
    </Link>
  );
}
