"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { reviewInsertSchema } from "@/lib/validations";

export async function addReview(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const raw = {
    budget_id: String(formData.get("budget_id") || ""),
    month: String(formData.get("month") || ""),
    what_worked: String(formData.get("what_worked") || ""),
    what_did_not_work: String(formData.get("what_did_not_work") || ""),
    went_over_budget: String(formData.get("went_over_budget") || ""),
    extra_room: String(formData.get("extra_room") || ""),
    next_month_changes: String(formData.get("next_month_changes") || ""),
    next_month_goal: String(formData.get("next_month_goal") || ""),
  };

  const parsed = reviewInsertSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const monthValue = parsed.data.month.length === 7 ? `${parsed.data.month}-01` : parsed.data.month;

  const { error } = await supabase.from("monthly_reviews").insert({
    budget_id: parsed.data.budget_id || null, user_id: user.id, month: monthValue,
    what_worked: parsed.data.what_worked || null,
    what_did_not_work: parsed.data.what_did_not_work || null,
    went_over_budget: parsed.data.went_over_budget || null,
    extra_room: parsed.data.extra_room || null,
    next_month_changes: parsed.data.next_month_changes || null,
    next_month_goal: parsed.data.next_month_goal || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/reviews");
  revalidatePath("/dashboard");
}

export async function deleteReview(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Review ID is required");
  const { error } = await supabase.from("monthly_reviews").delete().eq("id", id).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/reviews");
  revalidatePath("/dashboard");
}