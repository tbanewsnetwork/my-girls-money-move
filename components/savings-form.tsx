"use client";

import { useRef, useState } from "react";
import { addSavingsGoal, updateSavingsGoal } from "@/app/(protected)/savings/actions";

export default function SavingsForm({ budgetId, initial }: { budgetId: string; initial?: any }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const editing = Boolean(initial?.id);

  return (
    <form ref={formRef} action={async (formData) => {
      setError("");
      setSuccess("");
      try {
        if (editing) { formData.set("id", initial.id); await updateSavingsGoal(formData); setSuccess("Goal updated."); }
        else { await addSavingsGoal(formData); setSuccess("Goal saved."); }
        formRef.current?.reset();
      } catch (err: any) {
        setError(err?.message || "Failed to save goal. Please try again.");
      }
    }} className="space-y-4">
      {editing ? <input type="hidden" name="id" defaultValue={initial.id} /> : null}
      <input type="hidden" name="budget_id" value={budgetId} />
      <Field name="goal_name" label="Goal name" defaultValue={initial?.goal_name} placeholder="Emergency fund, New phone..." />
      <Field name="starting_amount" label="Starting amount" type="number" step="0.01" defaultValue={initial?.starting_amount} />
      <Field name="target_amount" label="Target amount" type="number" step="0.01" defaultValue={initial?.target_amount} />
      <Field name="current_amount" label="Current amount" type="number" step="0.01" defaultValue={initial?.current_amount} />
      <Field name="target_date" label="Target date" type="date" defaultValue={initial?.target_date} />
      <button className="w-full rounded-2xl bg-primary px-4 py-3 font-medium text-white transition hover:bg-primary-dark">
        {editing ? "Update goal" : "Save goal"}
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