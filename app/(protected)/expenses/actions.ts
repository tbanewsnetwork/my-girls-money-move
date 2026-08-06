"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { expenseInsertSchema, expenseUpdateSchema } from "@/lib/validations";

export async function addExpense(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const raw = {
    budget_id: String(formData.get("budget_id") || ""),
    expense_date: String(formData.get("expense_date") || ""),
    category: String(formData.get("category") || ""),
    description: String(formData.get("description") || ""),
    amount: Number(formData.get("amount") || 0),
    need_or_want: String(formData.get("need_or_want") || ""),
    notes: String(formData.get("notes") || ""),
  };

  const parsed = expenseInsertSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const { error } = await supabase.from("expenses").insert({
    budget_id: parsed.data.budget_id || null, user_id: user.id, expense_date: parsed.data.expense_date,
    category: parsed.data.category, description: parsed.data.description || null, amount: parsed.data.amount,
    need_or_want: parsed.data.need_or_want || null, notes: parsed.data.notes || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/expenses");
  revalidatePath("/dashboard");
}

export async function updateExpense(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const raw = {
    id: String(formData.get("id") || ""),
    budget_id: String(formData.get("budget_id") || ""),
    expense_date: String(formData.get("expense_date") || ""),
    category: String(formData.get("category") || ""),
    description: String(formData.get("description") || ""),
    amount: Number(formData.get("amount") || 0),
    need_or_want: String(formData.get("need_or_want") || ""),
    notes: String(formData.get("notes") || ""),
  };

  const parsed = expenseUpdateSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const { error } = await supabase.from("expenses").update({
    expense_date: parsed.data.expense_date, category: parsed.data.category, description: parsed.data.description || null,
    amount: parsed.data.amount, need_or_want: parsed.data.need_or_want || null, notes: parsed.data.notes || null,
  }).eq("id", parsed.data.id).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/expenses");
  revalidatePath("/dashboard");
}

export async function deleteExpense(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Expense ID is required");
  const { error } = await supabase.from("expenses").delete().eq("id", id).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/expenses");
  revalidatePath("/dashboard");
}