import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BudgetForm from "@/components/budget-form";
import { deleteBudget } from "./actions";

export default async function BudgetPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { data: budgets } = await supabase
    .from("budgets")
    .select("id, user_id, month, income_total, fixed_total, variable_total, savings_total, debt_total, fun_total, planned_spending, balance, created_at, updated_at")
    .eq("user_id", user.id)
    .order("month", { ascending: false });

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Budget</p>
          <h1 className="mt-1 text-2xl font-bold">Monthly Budget</h1>
          <p className="mt-1 text-sm text-slate-600">Plan your income and spending categories.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Create budget</h2>
            <div className="mt-4">
              <BudgetForm />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Your budgets</h2>
            <div className="mt-4 space-y-3">
              {(budgets || []).length > 0 ? (
                (budgets || []).map((b) => (
                  <div key={b.id} className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">{b.month}</p>
                        <div className="mt-1 text-sm text-slate-600">
                          <span>Income: ${Number(b.income_total).toLocaleString()}</span>
                          {" · "}
                          <span>Planned: ${Number(b.planned_spending).toLocaleString()}</span>
                          {" · "}
                          <span>Balance: ${Number(b.balance).toLocaleString()}</span>
                        </div>
                      </div>
                      <form action={deleteBudget}>
                        <input type="hidden" name="id" value={b.id} />
                        <button className="rounded-full border border-rose-300 px-3 py-1 text-sm text-rose-600">Delete</button>
                      </form>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-slate-500">No budgets yet. Create your first one.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}