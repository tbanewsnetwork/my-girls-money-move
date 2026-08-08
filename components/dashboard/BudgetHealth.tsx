import { Lightbulb } from "lucide-react";

export default function BudgetHealth() {
  return (
    <div className="app-card p-6">
      <h2 className="text-lg font-bold text-slate-950">
        Budget Health
      </h2>

      <div className="mt-6 text-5xl font-extrabold tracking-tight text-emerald-600">
        78%
      </div>

      <p className="mt-1 text-sm text-slate-500">
        of your budget used
      </p>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: "78%" }}
        />
      </div>

      <div className="mt-3 text-sm font-bold text-slate-900">
        $2,340 of $3,000
      </div>

      <div className="mt-6 rounded-xl bg-emerald-50 p-4">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600">
            <Lightbulb size={18} />
          </div>

          <div>
            <div className="text-sm font-bold text-emerald-900">
              Smart money tip
            </div>

            <p className="mt-1 text-xs leading-5 text-emerald-700">
              You have $660 left to spend wisely this month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}