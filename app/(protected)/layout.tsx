import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/logout-button";
import MobileNav from "@/components/mobile-nav";
import Link from "next/link";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/budget", label: "Budget" },
  { href: "/expenses", label: "Expenses" },
  { href: "/savings", label: "Savings" },
  { href: "/debt", label: "Debt" },
  { href: "/reviews", label: "Reviews" },
  { href: "/export", label: "Export" },
  { href: "/settings", label: "Settings" },
];

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <section className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex items-center gap-2 px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">$</div>
          <span className="font-bold text-slate-900">My-Girls-App</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <LogoutButton />
          <p className="mt-3 text-center text-xs text-slate-400">
            Powered by <span className="font-bold text-slate-600">SDWJR</span>
          </p>
        </div>
      </aside>

      {/* Mobile hamburger nav */}
      <MobileNav />

      <main className="lg:pl-60">{children}</main>
    </section>
  );
}