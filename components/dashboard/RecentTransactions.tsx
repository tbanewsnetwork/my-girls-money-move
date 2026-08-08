const transactions = [
  {
    date: "Jul 7, 2026",
    merchant: "Amazon",
    category: "Shopping",
    amount: "-$45.99",
  },
  {
    date: "Jul 6, 2026",
    merchant: "Whole Foods",
    category: "Food",
    amount: "-$87.45",
  },
  {
    date: "Jul 5, 2026",
    merchant: "Uber",
    category: "Transportation",
    amount: "-$23.10",
  },
  {
    date: "Jul 4, 2026",
    merchant: "Netflix",
    category: "Entertainment",
    amount: "-$15.49",
  },
  {
    date: "Jul 1, 2026",
    merchant: "Paycheck",
    category: "Income",
    amount: "+$4,500.00",
  },
];

export default function RecentTransactions() {
  return (
    <div className="app-card overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Recent Transactions
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Your latest financial activity
          </p>
        </div>

        <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/70 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-6 py-3 font-semibold">Date</th>
              <th className="px-6 py-3 font-semibold">Description</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 text-right font-semibold">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={`${transaction.date}-${transaction.merchant}`}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-6 py-4 text-sm text-slate-500">
                  {transaction.date}
                </td>

                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  {transaction.merchant}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    {transaction.category}
                  </span>
                </td>

                <td
                  className={`px-6 py-4 text-right text-sm font-extrabold ${
                    transaction.amount.startsWith("+")
                      ? "text-emerald-600"
                      : "text-slate-900"
                  }`}
                >
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}