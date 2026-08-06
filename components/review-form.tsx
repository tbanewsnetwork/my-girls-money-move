"use client";

import { useRef, useState } from "react";
import { addReview } from "@/app/(protected)/reviews/actions";

export default function ReviewForm({ budgetId, defaultMonth }: { budgetId: string; defaultMonth: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <form ref={formRef} action={async (formData) => {
      setError("");
      setSuccess("");
      try {
        await addReview(formData);
        setSuccess("Review saved.");
        formRef.current?.reset();
      } catch (err: any) {
        setError(err?.message || "Failed to save review. Please try again.");
      }
    }} className="space-y-4">
      <input type="hidden" name="budget_id" value={budgetId} />
      <Field name="month" label="Month" type="month" defaultValue={defaultMonth?.slice(0, 7)} />
      <Field name="what_worked" label="What worked" placeholder="What went well this month?" />
      <Field name="what_did_not_work" label="What did not work" placeholder="What could have gone better?" />
      <Field name="went_over_budget" label="Went over budget" placeholder="Did you overspend? Where?" />
      <Field name="extra_room" label="Extra room" placeholder="Where did you have money left over?" />
      <Field name="next_month_changes" label="Next month changes" placeholder="What will you change?" />
      <Field name="next_month_goal" label="Next month goal" placeholder="What is your main goal?" />
      <button className="w-full rounded-2xl bg-primary px-4 py-3 font-medium text-white transition hover:bg-primary-dark">Save review</button>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {success ? <p className="text-sm text-green-600">{success}</p> : null}
    </form>
  );
}

function Field({ label, name, type = "text", defaultValue, placeholder }: { label: string; name: string; type?: string; defaultValue?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}