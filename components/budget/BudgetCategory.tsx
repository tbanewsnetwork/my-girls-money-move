"use client";

type BudgetCategoryProps = {
  title: string;
  description: string;
  percentage: number;
  amount: number;
  color?: "green" | "blue" | "red" | "yellow";
};

export default function BudgetCategory({
  title,
  description,
  percentage,
  amount,
  color = "green",
}: BudgetCategoryProps) {
  const colors = {
    green: {
      icon: "bg-emerald-50 text-emerald-600",
      bar: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-700",
    },
    blue: {
      icon: "bg-blue-50 text-blue-600",
      bar: "bg-blue-500",
      badge: "bg-blue-50 text-blue-700",
    },
    red: {
      icon: "bg-red-50 text-red-600",
      bar: "bg-red-500",
      badge: "bg-red-50 text-red-700",
    },
    yellow: {
      icon: "bg-amber-50 text-amber-600",
      bar: "bg-amber-500",
      badge: "bg-amber-50 text-amber-700",
    },
  };

  const style = colors[color];

  return (
    <div className="border-b border-slate-100 py-5 last:border-0">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
        >
          $
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-slate-900">
                {title}
              </div>

              <div className="mt-1 text-xs text-slate-400">
                {description}
              </div>
            </div>

            <span
              className={`rounded-lg px-2.5 py-1 text-xs font-bold ${style.badge}`}
            >
              {percentage}%
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${style.bar}`}
              style={{ width: `${percentage * 2.5}%` }}
            />
          </div>

          <div className="mt-3 flex justify-end">
            <div className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800">
              ${amount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}