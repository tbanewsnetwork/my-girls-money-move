const categories = [
  { name: "Housing", percent: 40, amount: "$936" },
  { name: "Food", percent: 15, amount: "$351" },
  { name: "Transportation", percent: 10, amount: "$234" },
  { name: "Entertainment", percent: 8, amount: "$187" },
  { name: "Other", percent: 27, amount: "$632" },
];

export default function SpendingOverview() {
  return (
    <div className="app-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Spending Overview
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Where your money is going
          </p>
        </div>

        <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold outline-none">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="mt-7 flex flex-col items-center gap-8 md:flex-row">
        {/* Donut */}
        <div className="relative flex h-48 w-48 shrink-0 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(#10b981 0deg 144deg, #38bdf8 144deg 198deg, #3b82f6 198deg 234deg, #8b5cf6 234deg 263deg, #cbd5e1 263deg 360deg)",
            }}
          />

          <div className="absolute flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-2xl font-extrabold text-slate-950">
              $2,340
            </span>
            <span className="text-xs text-slate-400">
              Total Spent
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-4">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    [
                      "bg-emerald-500",
                      "bg-cyan-400",
                      "bg-blue-500",
                      "bg-violet-500",
                      "bg-slate-300",
                    ][index]
                  }`}
                />

                <span className="text-slate-600">
                  {category.name}
                </span>
              </div>

              <div className="flex gap-4">
                <span className="font-semibold text-slate-500">
                  {category.percent}%
                </span>

                <span className="w-14 text-right font-bold text-slate-900">
                  {category.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-emerald-50 p-4">
        <div className="font-semibold text-emerald-900">
          You spent 8% less than last month
        </div>

        <div className="mt-1 text-xs text-emerald-700">
          Great job staying on track!
        </div>
      </div>
    </div>
  );
}