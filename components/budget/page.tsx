"use client";

import AppShell from "@/components/layout/AppShell";
import BudgetCategory from "@/components/budget/BudgetCategory";
import BudgetSummary from "@/components/budget/BudgetSummary";
import SavingsRate from "@/components/budget/SavingsRate";
import BudgetTips from "@/components/budget/BudgetTips";
import { CalendarDays, Save } from "lucide-react";

export default function BudgetPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">

        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="section-label">
              Budget
            </div>

            <h1 className="page-title mt-2">
              Plan Your Monthly Budget
            </h1>

            <p className="page-subtitle">
              Create a budget that works for your goals.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-card">
            <CalendarDays size={17} />
            July 2026
          </button>
        </header>

        <div className="grid gap-5 xl:grid-cols-[1.55fr_0.75fr]">

          {/* LEFT */}
          <div className="app-card p-6">

            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-xl font-extrabold text-slate-950">
                Create Your Budget
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Fill in your numbers to plan your month.
              </p>
            </div>

            {/* Income */}
            <div className="py-6">
              <label className="text-sm font-bold text-slate-900">
                Monthly Income
              </label>

              <input
                type="number"
                defaultValue="4500"
                className="input-field mt-3 text-lg"
              />
            </div>

            <div className="border-t border-slate-100 pt-5">
              <h3 className="text-lg font-bold text-slate-950">
                Allocate Your Budget
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Use the 50/30/20 rule as a guide or customize your plan.
              </p>
            </div>

            <div className="mt-2">
              <BudgetCategory
                title="Fixed Expenses"
                description="Rent, utilities, insurance, etc."
                percentage={40}
                amount={1800}
                color="green"
              />

              <BudgetCategory
                title="Variable Expenses"
                description="Food, shopping, transportation, etc."
                percentage={20}
                amount={900}
                color="blue"
              />

              <BudgetCategory
                title="Savings Goals"
                description="Emergency fund, goals, investments, etc."
                percentage={20}
                amount={900}
                color="green"
              />

              <BudgetCategory
                title="Debt Payments"
                description="Loans, credit cards, etc."
                percentage={10}
                amount={450}
                color="red"
              />

              <BudgetCategory
                title="Fun Money / Other"
                description="Enjoy guilt-free spending."
                percentage={10}
                amount={450}
                color="yellow"
              />
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-bold">
              <span>Total</span>
              <span>100% &nbsp; $4,500</span>
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white shadow-green transition hover:bg-emerald-600">
              <Save size={18} />
              Save Budget Plan
            </button>

            <button className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">
              Reset
            </button>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            <BudgetSummary />

            <SavingsRate />

            <BudgetTips />

            <div className="overflow-hidden rounded-2xl bg-emerald-50 p-6">
              <div className="text-3xl text-emerald-600">
                “
              </div>

              <p className="text-lg font-bold leading-7 text-emerald-950">
                A good budget gives you freedom, not restrictions.
              </p>

              <div className="mt-6 h-20">
                <svg
                  viewBox="0 0 400 100"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 80 C60 50 90 90 140 60 C200 20 220 80 280 45 C330 15 350 50 400 10"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}