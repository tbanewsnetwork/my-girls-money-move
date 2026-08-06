"use client";

import { useRef, useState } from "react";
import { addBudget, updateBudget } from "@/app/(protected)/budget/actions";

export default function BudgetForm({ initial }: { initial?: any }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const editing = Boolean(initial?.id);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        setError("");
        setSuccess("");
        try {
          if (editing) {
            formData.set("id", initial.id);
            await updateBudget(formData);
            setSuccess("Budget updated.");
          } else {
            await addBudget(formData);
            setSuccess("Budget saved.");
          }
          formRef.current?.reset();
        } catch (err: any) {
          setError(err?.message || "Failed to save budget. Please try again.");
        }
      }}
      className="space-y-4"
    >
      {editing ? <input type="hidden" name="id" defaultValue={initial.id} /> : null}
      <Field name="month" label="Month" type="month" defaultValue={initial?.month?.slice(0, 7)} />
      <Field name="income_total" label="Income" type="number" step="0.01" defaultValue={initial?.income_total} />
      <Field name="fixed_total" label="Fixed expenses" type="number" step="0.01" defaultValue={initial?.fixed_total} />
      <Field name="variable_total" label="Variable expenses" type="number" step="0.01" defaultValue={initial?.variable_total} />
      <Field name="savings_total" label="Savings" type="number" step="0.01" defaultValue={initial?.savings_total} />
      <Field name="debt_total" label="Debt payments" type="number" step="0.01" defaultValue={initial?.debt_total} />
      <Field name="fun_total" label="Fun money" type="number" step="0.01" defaultValue={initial?.fun_total} />
      <button className="w-full rounded-2xl bg-primary px-4 py-3 font-medium text-white transition hover:bg-primary-dark">
        {editing ? "Update budget" : "Save budget"}
      </button>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {success ? <p className="text-sm text-green-600">{success}</p> : null}
    </form>
  );
}

function Field({ label, name, type = "text", step, defaultValue }: { label: string; name: string; type?: string; step?: string; defaultValue?: any }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input name={name} type={type} step={step} defaultValue={defaultValue} className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}