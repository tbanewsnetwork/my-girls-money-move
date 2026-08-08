"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { budgetInsertSchema, budgetUpdateSchema } from "@/lib/validations";

export async function addBudget(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const raw = {
    month: String(formData.get("month") || ""),
    income_total: Number(formData.get("income_total") || 0),
    fixed_total: Number(formData.get("fixed_total") || 0),
    variable_total: Number(formData.get("variable_total") || 0),
    savings_total: Number(formData.get("savings_total") || 0),
    debt_total: Number(formData.get("debt_total") || 0),
    fun_total: Number(formData.get("fun_total") || 0),
  };

  const parsed = budgetInsertSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const monthValue = parsed.data.month.length === 7 ? `${parsed.data.month}-01` : parsed.data.month;
  const plannedSpending = parsed.data.fixed_total + parsed.data.variable_total + parsed.data.savings_total + parsed.data.debt_total + parsed.data.fun_total;
  const balance = parsed.data.income_total - plannedSpending;

  const { error } = await supabase.from("budgets").insert({
    user_id: user.id, month: monthValue, income_total: parsed.data.income_total,
    fixed_total: parsed.data.fixed_total, variable_total: parsed.data.variable_total,
    savings_total: parsed.data.savings_total, debt_total: parsed.data.debt_total,
    fun_total: parsed.data.fun_total, planned_spending: plannedSpending, balance,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/budget");
  revalidatePath("/dashboard");
}

export async function updateBudget(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const raw = {
    id: String(formData.get("id") || ""),
    month: String(formData.get("month") || ""),
    income_total: Number(formData.get("income_total") || 0),
    fixed_total: Number(formData.get("fixed_total") || 0),
    variable_total: Number(formData.get("variable_total") || 0),
    savings_total: Number(formData.get("savings_total") || 0),
    debt_total: Number(formData.get("debt_total") || 0),
    fun_total: Number(formData.get("fun_total") || 0),
  };

  const parsed = budgetUpdateSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const monthValue = parsed.data.month.length === 7 ? `${parsed.data.month}-01` : parsed.data.month;
  const plannedSpending = parsed.data.fixed_total + parsed.data.variable_total + parsed.data.savings_total + parsed.data.debt_total + parsed.data.fun_total;
  const balance = parsed.data.income_total - plannedSpending;

  const { error } = await supabase.from("budgets").update({
    month: monthValue, income_total: parsed.data.income_total, fixed_total: parsed.data.fixed_total,
    variable_total: parsed.data.variable_total, savings_total: parsed.data.savings_total, debt_total: parsed.data.debt_total,
    fun_total: parsed.data.fun_total, planned_spending: plannedSpending, balance,
  }).eq("id", parsed.data.id).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/budget");
  revalidatePath("/dashboard");
}

export async function deleteBudget(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Budget ID is required");
  const { error } = await supabase.from("budgets").delete().eq("id", id).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/budget");
  revalidatePath("/dashboard");
}