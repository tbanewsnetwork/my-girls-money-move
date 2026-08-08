export default function BudgetSummary() {
  return (
    <div className="rounded-2xl bg-[#071512] p-6 text-white shadow-green">
      <div className="text-lg font-bold">
        Budget Summary
      </div>

      <div className="mx-auto mt-7 flex h-48 w-48 items-center justify-center rounded-full border-[18px] border-emerald-500">
        <div className="text-center">
          <div className="text-3xl font-extrabold">
            $4,500
          </div>

          <div className="mt-1 text-xs text-slate-400">
            Monthly Income
          </div>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 divide-x divide-white/10 text-center">
        <div>
          <div className="text-xl font-extrabold">
            $3,600
          </div>

          <div className="mt-1 text-xs text-slate-400">
            Planned Expenses
          </div>
        </div>

        <div>
          <div className="text-xl font-extrabold">
            $900
          </div>

          <div className="mt-1 text-xs text-slate-400">
            Available
          </div>
        </div>
      </div>
    </div>
  );
}