import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ExpenseForm from "@/components/expense-form";
import { deleteExpense } from "./actions";

export default async function ExpensesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { data: budget } = await supabase
    .from("budgets").select("id, month").eq("user_id", user.id)
    .order("month", { ascending: false }).limit(1).maybeSingle();

  const { data: expenses } = await supabase
    .from("expenses").select("id, user_id, budget_id, expense_date, category, description, amount, need_or_want, notes, created_at, updated_at").eq("user_id", user.id)
    .order("expense_date", { ascending: false }).limit(50);

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Expenses</p>
          <h1 className="mt-1 text-2xl font-bold">Track Your Spending</h1>
          <p className="mt-1 text-sm text-slate-600">Log every expense and categorize it.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Add expense</h2>
            <div className="mt-4">
              <ExpenseForm budgetId={budget?.id ?? ""} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Recent expenses</h2>
            <div className="mt-4 space-y-3">
              {(expenses || []).length > 0 ? (
                (expenses || []).map((e) => (
                  <div key={e.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <div>
                      <p className="font-medium text-sm">{e.description}</p>
                      <p className="text-xs text-slate-500">{e.category} — {e.expense_date}</p>
                      {e.need_or_want && (
                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${e.need_or_want === "need" ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-700"}`}>
                          {e.need_or_want}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">${Number(e.amount).toLocaleString()}</p>
                      <form action={deleteExpense}>
                        <input type="hidden" name="id" value={e.id} />
                        <button className="rounded-full border border-rose-300 px-3 py-1 text-sm text-rose-600">Delete</button>
                      </form>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-slate-500">No expenses yet. Add your first one.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}