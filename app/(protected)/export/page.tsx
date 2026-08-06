"use client";

import { useState } from "react";
import { exportExpensesCsv, exportSavingsCsv, exportDebtCsv, exportBudgetsCsv } from "./actions";

export default function ExportPage() {
  const [loading, setLoading] = useState<string | null>(null);

  function toCsv(rows: any[]): string {
    if (rows.length === 0) return "No data";
    const headers = Object.keys(rows[0]);
    const lines = [headers.join(",")];
    for (const row of rows) {
      lines.push(headers.map((h) => {
        const v = row[h];
        if (v === null || v === undefined) return "";
        const s = String(v).replace(/"/g, '""');
        return `"${s}"`;
      }).join(","));
    }
    return lines.join("\n");
  }

  async function downloadData(type: string, fn: () => Promise<any[]>, filename: string) {
    setLoading(type);
    try {
      const rows = await fn();
      const csv = toCsv(rows);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(null);
    }
  }

  const buttons = [
    { type: "expenses", label: "Export Expenses", fn: exportExpensesCsv, file: "expenses.csv" },
    { type: "savings", label: "Export Savings", fn: exportSavingsCsv, file: "savings.csv" },
    { type: "debt", label: "Export Debt", fn: exportDebtCsv, file: "debt.csv" },
    { type: "budgets", label: "Export Budgets", fn: exportBudgetsCsv, file: "budgets.csv" },
  ];

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Export</p>
          <h1 className="mt-1 text-2xl font-bold">Export Your Data</h1>
          <p className="mt-1 text-sm text-slate-600">Download your financial data as CSV files.</p>
        </div>

        <div className="space-y-3">
          {buttons.map((b) => (
            <button
              key={b.type}
              onClick={() => downloadData(b.type, b.fn, b.file)}
              disabled={loading !== null}
              className="flex w-full items-center justify-between rounded-2xl bg-white p-5 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              <span className="font-medium">{b.label}</span>
              <span className="text-sm text-slate-500">{loading === b.type ? "Downloading..." : "CSV"}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}