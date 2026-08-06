import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const budgetCols = "id,month,income_total,fixed_total,variable_total,savings_total,debt_total,fun_total,planned_spending,balance";
  const expenseCols = "id,description,category,expense_date,amount,need_or_want";
  const savingsCols = "id,goal_name,current_amount,target_amount";
  const debtCols = "id,creditor,balance,minimum_payment,interest_rate";
  const reviewCols = "id,month";

  const [{ data: budget }, { data: expenses }, { data: savings }, { data: debts }, { data: reviews }, { data: profile }] = await Promise.all([
    supabase.from("budgets").select(budgetCols).eq("user_id", user.id).order("month", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("expenses").select(expenseCols).eq("user_id", user.id).order("expense_date", { ascending: false }).limit(5),
    supabase.from("savings_goals").select(savingsCols).eq("user_id", user.id).order("updated_at", { ascending: false }).limit(5),
    supabase.from("debt_accounts").select(debtCols).eq("user_id", user.id).order("updated_at", { ascending: false }).limit(5),
    supabase.from("monthly_reviews").select(reviewCols).eq("user_id", user.id).order("month", { ascending: false }).limit(3),
    supabase.from("profiles").select("full_name,username").eq("id", user.id).maybeSingle(),
  ]);

  const income = Number(budget?.income_total ?? 0);
  const balance = Number(budget?.balance ?? 0);
  const plannedSpending = Number(budget?.planned_spending ?? 0);
  const totalSavings = (savings || []).reduce((sum, s) => sum + Number(s.current_amount), 0);
  const totalDebt = (debts || []).reduce((sum, d) => sum + Number(d.balance), 0);

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold">Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}</h1>
          <p className="mt-1 text-sm text-slate-600">Your live money snapshot.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Income" value={`$${income.toLocaleString()}`} />
          <StatCard label="Balance" value={`$${balance.toLocaleString()}`} accent={balance >= 0 ? "positive" : "negative"} />
          <StatCard label="Total Savings" value={`$${totalSavings.toLocaleString()}`} />
          <StatCard label="Total Debt" value={`$${totalDebt.toLocaleString()}`} accent={totalDebt > 0 ? "negative" : undefined} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-semibold">Recent expenses</h2>
            <div className="mt-4 space-y-3">
              {(expenses || []).length > 0 ? (
                (expenses || []).map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <div>
                      <p className="font-medium text-sm">{item.description}</p>
                      <p className="text-xs text-slate-500">{item.category} — {item.expense_date}</p>
                    </div>
                    <p className="font-semibold">${Number(item.amount).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm text-slate-500">No expenses yet. Start tracking your spending.</p>
                  <Link href="/expenses" className="mt-3 inline-block rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Add expense</Link>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Budget summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <MiniRow label="Month" value={budget?.month ?? "No budget yet"} />
              <MiniRow label="Planned spend" value={`$${plannedSpending.toLocaleString()}`} />
              <MiniRow label="Balance" value={`$${balance.toLocaleString()}`} />
              <MiniRow label="Latest review" value={reviews?.[0]?.month ?? "None"} />
              <Link href="/budget" className="mt-2 block rounded-full border border-slate-200 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50">Edit budget</Link>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction href="/expenses" label="Add Expense" />
          <QuickAction href="/savings" label="Set Savings Goal" />
          <QuickAction href="/debt" label="Track Debt" />
          <QuickAction href="/reviews" label="Monthly Review" />
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: "positive" | "negative" }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-xl font-bold ${accent === "negative" ? "text-rose-600" : accent === "positive" ? "text-primary" : ""}`}>{value}</p>
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
      {label}
    </Link>
  );
}