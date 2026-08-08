import { CheckCircle2 } from "lucide-react";

const tips = [
  "Keep your savings rate at 20% or higher.",
  "Review and adjust your budget every month.",
  "Track your expenses consistently.",
];

export default function BudgetTips() {
  return (
    <div className="app-card p-6">
      <h3 className="text-lg font-bold text-slate-950">
        Budget Tips
      </h3>

      <div className="mt-5 space-y-5">
        {tips.map((tip) => (
          <div key={tip} className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={17} />
            </div>

            <p className="text-sm leading-6 text-slate-600">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}