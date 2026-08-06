import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DebtForm from "@/components/debt-form";
import { deleteDebtAccount } from "./actions.ts";

export default async function DebtPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { data: budget } = await supabase.from("budgets").select("id").eq("user_id", user.id).order("month", { ascending: false }).limit(1).maybeSingle();
  const { data: debts } = await supabase.from("debt_accounts").select("id, user_id, budget_id, creditor, balance, minimum_payment, interest_rate, due_date, payoff_method, created_at, updated_at").eq("user_id", user.id).order("updated_at", { ascending: false });

  const totalDebt = (debts || []).reduce((s, d) => s + Number(d.balance), 0);
  const totalMin = (debts || []).reduce((s, d) => s + Number(d.minimum_payment || 0), 0);

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Debt</p>
          <h1 className="mt-1 text-2xl font-bold">Debt Tracking</h1>
          <p className="mt-1 text-sm text-slate-600">Track balances, payments, and interest rates.</p>
        </div>

        {(debts || []).length > 0 && (
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Total Debt</p><p className="mt-1 text-xl font-bold text-rose-600">${totalDebt.toLocaleString()}</p></div>
            <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Monthly Minimums</p><p className="mt-1 text-xl font-bold">${totalMin.toLocaleString()}</p></div>
            <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Accounts</p><p className="mt-1 text-xl font-bold">{(debts || []).length}</p></div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Add debt account</h2>
            <div className="mt-4"><DebtForm budgetId={budget?.id ?? ""} /></div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Your debts</h2>
            <div className="mt-4 space-y-3">
              {(debts || []).length > 0 ? (debts || []).map((d) => (
                <div key={d.id} className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{d.creditor}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Balance: ${Number(d.balance).toLocaleString()}
                        {d.interest_rate != null ? ` · ${d.interest_rate}% APR` : ""}
                        {d.due_date ? ` · Due: ${d.due_date}` : ""}
                      </p>
                      {d.payoff_method && <span className="mt-1 inline-block rounded-full bg-slate-200 px-2 py-0.5 text-xs capitalize">{d.payoff_method}</span>}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${Number(d.minimum_payment).toLocaleString()}</p>
                      <p className="text-xs text-slate-500">min/mo</p>
                      <form action={deleteDebtAccount} className="mt-1">
                        <input type="hidden" name="id" value={d.id} />
                        <button className="rounded-full border border-rose-300 px-3 py-0.5 text-xs text-rose-600">Delete</button>
                      </form>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="py-8 text-center text-sm text-slate-500">No debt accounts yet. Add your first one.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}