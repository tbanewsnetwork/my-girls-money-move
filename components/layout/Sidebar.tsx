"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  WalletCards,
  Receipt,
  PiggyBank,
  Landmark,
  ClipboardCheck,
  Download,
  Settings,
  LogOut,
  DollarSign,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Budget",
    href: "/budget",
    icon: WalletCards,
  },
  {
    label: "Expenses",
    href: "/expenses",
    icon: Receipt,
  },
  {
    label: "Savings",
    href: "/savings",
    icon: PiggyBank,
  },
  {
    label: "Debt",
    href: "/debt",
    icon: Landmark,
  },
  {
    label: "Reviews",
    href: "/reviews",
    icon: ClipboardCheck,
  },
  {
    label: "Export",
    href: "/export",
    icon: Download,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[250px] flex-col bg-[#071512] text-white lg:flex">
      
      {/* Brand */}
      <div className="px-6 pb-7 pt-7">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 shadow-green">
            <DollarSign size={24} strokeWidth={2.8} />
          </div>

          <div>
            <div className="text-lg font-extrabold tracking-tight">
              MY-GIRLS
            </div>
            <div className="-mt-1 text-sm font-medium italic text-emerald-400">
              Money Moves
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                active
                  ? "bg-emerald-500 text-white shadow-green"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon
                size={19}
                strokeWidth={active ? 2.5 : 2}
              />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="border-t border-white/10 p-4">
        <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold">
            S
          </div>

          <div className="text-sm font-bold">
            Samuel D Wilson Jr
          </div>

          <div className="mt-1 text-xs font-medium text-emerald-400">
            Premium Plan
          </div>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
          <LogOut size={17} />
          Log out
        </button>

        <div className="mt-5 text-center text-xs text-slate-500">
          Powered by{" "}
          <span className="font-bold text-emerald-400">
            SDWJR
          </span>
        </div>
      </div>
    </aside>
  );
}