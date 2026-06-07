export type NavIconName = "slider" | "projects" | "setting" | "dashboard";

export type NavChild = {
  label: string;
  href: string;
  pageTitle?: string;
};

export type NavItem = {
  label: string;
  href?: string;
  icon: NavIconName;
  pageTitle?: string;
  children?: NavChild[];
};

export type Breadcrumb = { label: string; href?: string };

export type PageHeaderMeta = {
  title: string;
  breadcrumbs: Breadcrumb[];
};

export const adminNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "Slider",
    icon: "slider",
    children: [{ label: "All sliders", href: "/sliders", pageTitle: "Sliders" }],
  },
  {
    label: "Projects",
    href: "/projects",
    icon: "projects",
  },
  {
    label: "Setting",
    icon: "setting",
    children: [{ label: "General Setting", href: "/settings/general" }],
  },
];

const dashboardCrumb: Breadcrumb = {
  label: "Dashboard",
  href: "/dashboard",
};

export function getPageHeaderMeta(pathname: string): PageHeaderMeta {
  for (const item of adminNav) {
    if (item.href && pathname === item.href) {
      const title = item.pageTitle ?? item.label;
      if (item.href === "/dashboard") {
        return { title, breadcrumbs: [dashboardCrumb] };
      }
      return {
        title,
        breadcrumbs: [dashboardCrumb, { label: item.label }],
      };
    }

    if (!item.children) continue;

    for (const child of item.children) {
      if (pathname !== child.href && !pathname.startsWith(`${child.href}/`)) {
        continue;
      }

      return {
        title: child.pageTitle ?? child.label,
        breadcrumbs: [
          dashboardCrumb,
          { label: item.label },
          { label: child.label },
        ],
      };
    }
  }

  return {
    title: "Dashboard",
    breadcrumbs: [dashboardCrumb],
  };
}
