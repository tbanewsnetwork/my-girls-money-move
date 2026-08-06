import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SavingsForm from "@/components/savings-form";
import { deleteSavingsGoal } from "./actions";

export default async function SavingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { data: budget } = await supabase.from("budgets").select("id").eq("user_id", user.id).order("month", { ascending: false }).limit(1).maybeSingle();
  const { data: goals } = await supabase.from("savings_goals").select("id, user_id, budget_id, goal_name, starting_amount, target_amount, current_amount, target_date, created_at, updated_at").eq("user_id", user.id).order("updated_at", { ascending: false });

  const totalSaved = (goals || []).reduce((s, g) => s + Number(g.current_amount), 0);
  const totalTarget = (goals || []).reduce((s, g) => s + Number(g.target_amount), 0);

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Savings</p>
          <h1 className="mt-1 text-2xl font-bold">Savings Goals</h1>
          <p className="mt-1 text-sm text-slate-600">Set targets and watch your money grow.</p>
        </div>

        {(goals || []).length > 0 && (
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Total Saved</p><p className="mt-1 text-xl font-bold text-primary">${totalSaved.toLocaleString()}</p></div>
            <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Total Target</p><p className="mt-1 text-xl font-bold">${totalTarget.toLocaleString()}</p></div>
            <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Remaining</p><p className="mt-1 text-xl font-bold">${(totalTarget - totalSaved).toLocaleString()}</p></div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">New savings goal</h2>
            <div className="mt-4"><SavingsForm budgetId={budget?.id ?? ""} /></div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Your goals</h2>
            <div className="mt-4 space-y-3">
              {(goals || []).length > 0 ? (goals || []).map((g) => {
                const pct = g.target_amount > 0 ? Math.min(100, (g.current_amount / g.target_amount) * 100) : 0;
                return (
                  <div key={g.id} className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-start justify-between">
                      <p className="font-semibold">{g.goal_name}</p>
                      <form action={deleteSavingsGoal}>
                        <input type="hidden" name="id" value={g.id} />
                        <button className="rounded-full border border-rose-300 px-3 py-1 text-sm text-rose-600">Delete</button>
                      </form>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xl font-bold">${Number(g.current_amount).toLocaleString()}</span>
                        <span className="text-sm text-slate-500">of ${Number(g.target_amount).toLocaleString()}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-slate-200">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{pct.toFixed(0)}% complete{g.target_date ? ` · By ${g.target_date}` : ""}</p>
                    </div>
                  </div>
                );
              }) : (
                <p className="py-8 text-center text-sm text-slate-500">No savings goals yet. Set your first one.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}