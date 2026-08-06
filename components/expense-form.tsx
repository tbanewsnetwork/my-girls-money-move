"use client";

import { useRef, useState } from "react";
import { addExpense, updateExpense } from "@/app/(protected)/expenses/actions";

export default function ExpenseForm({ budgetId, initial }: { budgetId: string; initial?: any }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const editing = Boolean(initial?.id);

  return (
    <form ref={formRef} action={async (formData) => {
      setError("");
      setSuccess("");
      try {
        if (editing) { formData.set("id", initial.id); await updateExpense(formData); setSuccess("Expense updated."); }
        else { await addExpense(formData); setSuccess("Expense saved."); }
        formRef.current?.reset();
      } catch (err: any) {
        setError(err?.message || "Failed to save expense. Please try again.");
      }
    }} className="space-y-4">
      {editing ? <input type="hidden" name="id" defaultValue={initial.id} /> : null}
      <input type="hidden" name="budget_id" value={budgetId} />
      <Field name="expense_date" label="Date" type="date" defaultValue={initial?.expense_date} />
      <Field name="category" label="Category" defaultValue={initial?.category} placeholder="Food, Transport, Bills..." />
      <Field name="description" label="Description" defaultValue={initial?.description} placeholder="What did you buy?" />
      <Field name="amount" label="Amount" type="number" step="0.01" defaultValue={initial?.amount} />
      <div>
        <label className="text-sm font-medium text-slate-700">Need or Want</label>
        <select name="need_or_want" defaultValue={initial?.need_or_want || ""} className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
          <option value="">Select...</option>
          <option value="need">Need</option>
          <option value="want">Want</option>
        </select>
      </div>
      <Field name="notes" label="Notes" defaultValue={initial?.notes} />
      <button className="w-full rounded-2xl bg-primary px-4 py-3 font-medium text-white transition hover:bg-primary-dark">
        {editing ? "Update expense" : "Save expense"}
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