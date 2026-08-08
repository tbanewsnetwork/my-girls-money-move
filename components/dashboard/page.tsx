import AppShell from "@/components/layout/AppShell";
import FinancialCard from "@/components/dashboard/FinancialCard";
import SpendingOverview from "@/components/dashboard/SpendingOverview";
import BudgetHealth from "@/components/dashboard/BudgetHealth";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { Bell, CalendarDays } from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">
        
        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="section-label">
              Dashboard
            </div>

            <h1 className="page-title mt-2">
              Good morning, Samuel! 👋
            </h1>

            <p className="page-subtitle">
              Here's your financial snapshot for this month.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-card hover:bg-slate-50">
              <Bell size={19} />
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-card">
              <CalendarDays size={17} />
              July 2026
            </button>
          </div>
        </header>

        {/* Financial Cards */}
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <FinancialCard
            title="Income"
            value="$4,500"
            change="5.2%"
            type="income"
          />

          <FinancialCard
            title="Available"
            value="$1,120"
            change="8.1%"
            type="available"
          />

          <FinancialCard
            title="Savings"
            value="$2,340"
            change="12.4%"
            type="savings"
          />

          <FinancialCard
            title="Debt"
            value="$3,250"
            change="2.7%"
            positive={false}
            type="debt"
          />
        </section>

        {/* Charts */}
        <section className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
          <SpendingOverview />
          <BudgetHealth />
        </section>

        {/* Transactions */}
        <section className="mt-5">
          <RecentTransactions />
        </section>

      </div>
    </AppShell>
  );
}