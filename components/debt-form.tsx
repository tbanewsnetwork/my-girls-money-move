"use client";

import { useRef, useState } from "react";
import { addDebtAccount, updateDebtAccount } from "@/app/(protected)/debt/actions";

export default function DebtForm({ budgetId, initial }: { budgetId: string; initial?: any }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const editing = Boolean(initial?.id);

  return (
    <form ref={formRef} action={async (formData) => {
      setError("");
      setSuccess("");
      try {
        if (editing) { formData.set("id", initial.id); await updateDebtAccount(formData); setSuccess("Debt updated."); }
        else { await addDebtAccount(formData); setSuccess("Debt saved."); }
        formRef.current?.reset();
      } catch (err: any) {
        setError(err?.message || "Failed to save debt. Please try again.");
      }
    }} className="space-y-4">
      {editing ? <input type="hidden" name="id" defaultValue={initial.id} /> : null}
      <input type="hidden" name="budget_id" value={budgetId} />
      <Field name="creditor" label="Creditor" defaultValue={initial?.creditor} placeholder="Visa, Student loan, Car loan..." />
      <Field name="balance" label="Balance" type="number" step="0.01" defaultValue={initial?.balance} />
      <Field name="minimum_payment" label="Minimum payment" type="number" step="0.01" defaultValue={initial?.minimum_payment} />
      <Field name="interest_rate" label="Interest rate (%)" type="number" step="0.01" defaultValue={initial?.interest_rate} />
      <Field name="due_date" label="Due date" type="date" defaultValue={initial?.due_date} />
      <div>
        <label className="text-sm font-medium text-slate-700">Payoff method</label>
        <select name="payoff_method" defaultValue={initial?.payoff_method || "snowball"} className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
          <option value="snowball">Snowball (smallest balance first)</option>
          <option value="avalanche">Avalanche (highest interest first)</option>
          <option value="minimum">Minimum payments only</option>
        </select>
      </div>
      <button className="w-full rounded-2xl bg-primary px-4 py-3 font-medium text-white transition hover:bg-primary-dark">
        {editing ? "Update debt" : "Save debt"}
      </button>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {success ? <p className="text-sm text-green-600">{success}</p> : null}
    </form>
  );
}

function Field({ label, name, type = "text", step, defaultValue, placeholder }: { label: string; name: string; type?: string; step?: string; defaultValue?: any; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input name={name} type={type} step={step} defaultValue={defaultValue} placeholder={placeholder} className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}