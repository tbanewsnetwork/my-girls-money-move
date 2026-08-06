"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { debtInsertSchema, debtUpdateSchema } from "@/lib/validations";

export async function addDebtAccount(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");
 
  const raw = {
    budget_id: String(formData.get("budget_id") || ""),
    creditor: String(formData.get("creditor") || ""),
    balance: Number(formData.get("balance") || 0),
    minimum_payment: Number(formData.get("minimum_payment") || 0),
    interest_rate: Number(formData.get("interest_rate") || 0),
    due_date: String(formData.get("due_date") || ""),
    payoff_method: String(formData.get("payoff_method") || ""),
  };

  const parsed = debtInsertSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const { error } = await supabase.from("debt_accounts").insert({
    budget_id: parsed.data.budget_id || null, user_id: user.id,
    creditor: parsed.data.creditor, balance: parsed.data.balance,
    minimum_payment: parsed.data.minimum_payment,
    interest_rate: parsed.data.interest_rate || null,
    due_date: parsed.data.due_date || null,
    payoff_method: parsed.data.payoff_method || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/debt");
  revalidatePath("/dashboard");
}

export async function updateDebtAccount(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const raw = {
    id: String(formData.get("id") || ""),
    budget_id: String(formData.get("budget_id") || ""),
    creditor: String(formData.get("creditor") || ""),
    balance: Number(formData.get("balance") || 0),
    minimum_payment: Number(formData.get("minimum_payment") || 0),
    interest_rate: Number(formData.get("interest_rate") || 0),
    due_date: String(formData.get("due_date") || ""),
    payoff_method: String(formData.get("payoff_method") || ""),
  };

  const parsed = debtUpdateSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const { error } = await supabase.from("debt_accounts").update({
    creditor: parsed.data.creditor, balance: parsed.data.balance,
    minimum_payment: parsed.data.minimum_payment,
    interest_rate: parsed.data.interest_rate || null,
    due_date: parsed.data.due_date || null,
    payoff_method: parsed.data.payoff_method || null,
  }).eq("id", parsed.data.id).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/debt");
  revalidatePath("/dashboard");
}

export async function deleteDebtAccount(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Debt account ID is required");
  const { error } = await supabase.from("debt_accounts").delete().eq("id", id).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/debt");
  revalidatePath("/dashboard");
}