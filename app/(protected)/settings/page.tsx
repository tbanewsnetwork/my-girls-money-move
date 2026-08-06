import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, username, age_range, created_at, updated_at")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Settings</p>
          <h1 className="mt-1 text-2xl font-bold">Account Settings</h1>
          <p className="mt-1 text-sm text-slate-600">View your profile and account info.</p>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Profile</h2>
          <div className="mt-4 space-y-3">
            <Row label="Email" value={user.email ?? "N/A"} />
            <Row label="Full name" value={profile?.full_name ?? "Not set"} />
            <Row label="Username" value={profile?.username ?? "Not set"} />
            <Row label="Age range" value={profile?.age_range ?? "Not set"} />
            <Row label="Member since" value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"} />
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Danger zone</h2>
          <p className="mt-2 text-sm text-slate-600">To delete your account, please contact support.</p>
        </section>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
      <span className="shrink-0 text-sm font-medium text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-900 break-all">{value}</span>
    </div>
  );
}