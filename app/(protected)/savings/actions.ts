"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { savingsInsertSchema, savingsUpdateSchema } from "@/lib/validations";

export async function addSavingsGoal(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const raw = {
    budget_id: String(formData.get("budget_id") || ""),
    goal_name: String(formData.get("goal_name") || ""),
    starting_amount: Number(formData.get("starting_amount") || 0),
    target_amount: Number(formData.get("target_amount") || 0),
    current_amount: Number(formData.get("current_amount") || 0),
    target_date: String(formData.get("target_date") || ""),
  };

  const parsed = savingsInsertSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const { error } = await supabase.from("savings_goals").insert({
    budget_id: parsed.data.budget_id || null, user_id: user.id,
    goal_name: parsed.data.goal_name, starting_amount: parsed.data.starting_amount,
    target_amount: parsed.data.target_amount, current_amount: parsed.data.current_amount,
    target_date: parsed.data.target_date || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/savings");
  revalidatePath("/dashboard");
}

export async function updateSavingsGoal(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const raw = {
    id: String(formData.get("id") || ""),
    budget_id: String(formData.get("budget_id") || ""),
    goal_name: String(formData.get("goal_name") || ""),
    starting_amount: Number(formData.get("starting_amount") || 0),
    target_amount: Number(formData.get("target_amount") || 0),
    current_amount: Number(formData.get("current_amount") || 0),
    target_date: String(formData.get("target_date") || ""),
  };

  const parsed = savingsUpdateSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const { error } = await supabase.from("savings_goals").update({
    goal_name: parsed.data.goal_name, starting_amount: parsed.data.starting_amount,
    target_amount: parsed.data.target_amount, current_amount: parsed.data.current_amount,
    target_date: parsed.data.target_date || null,
  }).eq("id", parsed.data.id).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/savings");
  revalidatePath("/dashboard");
}

export async function deleteSavingsGoal(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Savings goal ID is required");
  const { error } = await supabase.from("savings_goals").delete().eq("id", id).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/savings");
  revalidatePath("/dashboard");
}