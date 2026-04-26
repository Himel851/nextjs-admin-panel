export type NavItem = {
  label: string;
  href?: string;
  icon: "dashboard" | "orders" | "clipboard" | "confirm" | "settings";
  children?: { label: string; href: string }[];
};

export const adminNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "Order list",
    icon: "clipboard",
    children: [
      { label: "All orders", href: "/orders" },
      { label: "Pending", href: "/orders/pending" },
    ],
  },
  {
    label: "Order confirmation",
    href: "/order-confirmation",
    icon: "confirm",
  },
];
