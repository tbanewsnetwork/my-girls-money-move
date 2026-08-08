import {
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
  PiggyBank,
  CreditCard,
  Banknote,
} from "lucide-react";

type FinancialCardProps = {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  type: "income" | "available" | "savings" | "debt";
};

const icons = {
  income: Banknote,
  available: Wallet,
  savings: PiggyBank,
  debt: CreditCard,
};

export default function FinancialCard({
  title,
  value,
  change,
  positive = true,
  type,
}: FinancialCardProps) {
  const Icon = icons[type];

  return (
    <div className="app-card group p-5 transition duration-200 hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon size={20} />
        </div>

        <div
          className={`flex items-center gap-1 text-xs font-bold ${
            positive ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {change}
        </div>
      </div>

      <div className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </div>

      <div className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">
        {value}
      </div>

      <div className="mt-1 text-xs text-slate-400">
        from last month
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${
            positive ? "bg-emerald-500" : "bg-red-400"
          }`}
          style={{ width: positive ? "72%" : "48%" }}
        />
      </div>
    </div>
  );
}