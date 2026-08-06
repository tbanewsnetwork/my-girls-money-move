"use server";

import { createClient } from "@/lib/supabase/server";

const expenseCols = "id,expense_date,category,description,amount,need_or_want,notes,created_at,updated_at";
const savingsCols = "id,goal_name,starting_amount,target_amount,current_amount,target_date,created_at,updated_at";
const debtCols = "id,creditor,balance,minimum_payment,interest_rate,due_date,payoff_method,created_at,updated_at";
const budgetCols = "id,month,income_total,fixed_total,variable_total,savings_total,debt_total,fun_total,planned_spending,balance,created_at,updated_at";

export async function exportExpensesCsv() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");
  const { data } = await supabase.from("expenses").select(expenseCols).eq("user_id", user.id).order("expense_date", { ascending: false });
  return data || [];
}

export async function exportSavingsCsv() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");
  const { data } = await supabase.from("savings_goals").select(savingsCols).eq("user_id", user.id).order("updated_at", { ascending: false });
  return data || [];
}

export async function exportDebtCsv() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");
  const { data } = await supabase.from("debt_accounts").select(debtCols).eq("user_id", user.id).order("updated_at", { ascending: false });
  return data || [];
}

export async function exportBudgetsCsv() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");
  const { data } = await supabase.from("budgets").select(budgetCols).eq("user_id", user.id).order("month", { ascending: false });
  return data || [];
}