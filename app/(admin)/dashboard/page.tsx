import Link from "next/link";

const stats = [
  { label: "Orders today", value: "128", delta: "+12%", trend: "up" as const },
  { label: "Revenue (demo)", value: "৳ 4.2L", delta: "+8%", trend: "up" as const },
  { label: "Pending", value: "23", delta: "−3", trend: "down" as const },
  { label: "Avg. basket", value: "৳ 3,240", delta: "+2%", trend: "up" as const },
];

const recentOrders = [
  { id: "#PO-9041", customer: "Rahim Traders", amount: "৳ 12,400", status: "Paid" },
  { id: "#PO-9040", customer: "Nova Mart", amount: "৳ 8,920", status: "Pending" },
  { id: "#PO-9039", customer: "City Wholesale", amount: "৳ 54,100", status: "Paid" },
  { id: "#PO-9038", customer: "Green Leaf", amount: "৳ 3,050", status: "Shipped" },
];

const activityBars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-600">
            Demo overview — orders, revenue, and activity at a glance.
          </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                {s.label}
              </p>
              <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-900">
                {s.value}
              </p>
              <p
                className={`mt-1 text-xs font-medium ${
                  s.trend === "up" ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {s.delta} vs last week
              </p>
            </div>
          ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
          <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm lg:col-span-3">
            <h2 className="text-sm font-semibold text-zinc-900">Weekly activity</h2>
            <p className="mt-0.5 text-xs text-zinc-500">Demo volume by day</p>
            <div className="mt-6 flex h-40 items-end justify-between gap-1.5 px-1">
              {activityBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-linear-to-t from-indigo-600 to-indigo-400 opacity-90 transition-opacity hover:opacity-100"
                  style={{ height: `${h}%` }}
                  title={`Day ${i + 1}`}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-zinc-400">
              <span>Mon</span>
              <span>Sun</span>
            </div>
          </section>

          <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm lg:col-span-2">
            <h2 className="text-sm font-semibold text-zinc-900">Quick actions</h2>
            <p className="mt-0.5 text-xs text-zinc-500">Shortcuts (demo)</p>
            <ul className="mt-4 space-y-2">
              {[
                { label: "New POS order", href: "/orders/pos" },
                { label: "View all orders", href: "/orders" },
                { label: "Pending queue", href: "/orders/pending" },
              ].map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-200 hover:bg-white"
                  >
                    {a.label}
                    <span className="text-zinc-400" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
      </div>

      <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-zinc-900">Recent orders</h2>
            <p className="text-xs text-zinc-500">Sample data for layout only</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-lg text-left text-sm">
              <thead className="bg-zinc-50 text-xs font-medium uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {recentOrders.map((row) => (
                  <tr key={row.id} className="text-zinc-800">
                    <td className="px-5 py-3 font-mono text-xs text-zinc-600">
                      {row.id}
                    </td>
                    <td className="px-5 py-3">{row.customer}</td>
                    <td className="px-5 py-3 tabular-nums">{row.amount}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          row.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : row.status === "Pending"
                              ? "bg-amber-50 text-amber-800"
                              : "bg-sky-50 text-sky-800"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </section>
    </div>
  );
}
