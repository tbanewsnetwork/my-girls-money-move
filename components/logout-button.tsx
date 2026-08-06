"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut({ scope: "local" });
    router.push("/auth/sign-in");
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
      Log out
    </button>
  );
}