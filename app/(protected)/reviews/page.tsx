import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ReviewForm from "@/components/review-form";
import { deleteReview } from "./actions";

export default async function ReviewsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { data: budget } = await supabase.from("budgets").select("id, month").eq("user_id", user.id).order("month", { ascending: false }).limit(1).maybeSingle();
  const { data: reviews } = await supabase.from("monthly_reviews").select("id, user_id, budget_id, month, what_worked, what_did_not_work, went_over_budget, extra_room, next_month_changes, next_month_goal, created_at, updated_at").eq("user_id", user.id).order("month", { ascending: false });

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Reviews</p>
          <h1 className="mt-1 text-2xl font-bold">Monthly Reviews</h1>
          <p className="mt-1 text-sm text-slate-600">Reflect on what worked, what didn't, and plan next month.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">New review</h2>
            <div className="mt-4"><ReviewForm budgetId={budget?.id ?? ""} defaultMonth={budget?.month ?? new Date().toISOString().slice(0, 7)} /></div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Past reviews</h2>
            <div className="mt-4 space-y-3">
              {(reviews || []).length > 0 ? (reviews || []).map((r) => (
                <div key={r.id} className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-start justify-between">
                    <p className="font-semibold">{r.month}</p>
                    <form action={deleteReview}>
                      <input type="hidden" name="id" value={r.id} />
                      <button className="rounded-full border border-rose-300 px-3 py-0.5 text-xs text-rose-600">Delete</button>
                    </form>
                  </div>
                  <div className="mt-2 space-y-2 text-sm">
                    {r.what_worked && <ReviewField label="Worked" value={r.what_worked} />}
                    {r.what_did_not_work && <ReviewField label="Didn't work" value={r.what_did_not_work} />}
                    {r.next_month_goal && <ReviewField label="Next goal" value={r.next_month_goal} />}
                  </div>
                </div>
              )) : (
                <p className="py-8 text-center text-sm text-slate-500">No reviews yet. Create your first one.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-medium text-slate-500">{label}:</span>
      <span className="text-slate-700">{value}</span>
    </div>
  );
}