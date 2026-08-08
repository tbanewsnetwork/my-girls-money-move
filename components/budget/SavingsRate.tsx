import { PiggyBank } from "lucide-react";

export default function SavingsRate() {
  return (
    <div className="app-card p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        <PiggyBank size={21} />
      </div>

      <div className="mt-5 text-sm font-medium text-slate-500">
        Savings Rate
      </div>

      <div className="mt-1 text-4xl font-extrabold text-slate-950">
        20%
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Great job! You're building financial security.
      </p>

      <div className="mt-5 h-2.5 rounded-full bg-slate-100">
        <div className="h-full w-3/4 rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}