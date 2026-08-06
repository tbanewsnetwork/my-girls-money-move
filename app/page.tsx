import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">M</div>
            <span className="font-bold text-slate-900">My-Girls-App</span>
          </div>
          <Link href="/auth/sign-in" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-primary-dark">
            Open App
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Enterprise-grade security
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Your money. <span className="text-primary">Your privacy.</span> Protected.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            A secure personal finance application with banking-level data isolation. Budget, save, and crush debt — with complete confidence that your data is yours alone.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/auth/sign-up" className="rounded-full bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary-dark">
              Get Started Free
            </Link>
            <Link href="/auth/sign-in" className="rounded-full border border-slate-200 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Security banner */}
      <section className="px-6 py-8 bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <SecurityFeature icon="shield" title="Row Level Security" desc="Every query is scoped to your account at the database level. No user can ever access another's data." />
            <SecurityFeature icon="lock" title="Private Storage" desc="File uploads use private Supabase Storage buckets with per-user access policies." />
            <SecurityFeature icon="key" title="Auth Required" desc="Every API route and page requires authenticated sessions. No public data access, ever." />
            <SecurityFeature icon="server" title="Server-Side Validation" desc="All inputs are validated server-side. User identity is derived from auth sessions, never client-supplied." />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Budget Planning", desc: "Set income, track fixed and variable costs, and see your balance at a glance.", icon: "💰" },
            { title: "Expense Tracking", desc: "Log every expense by category. Know what is a need vs. a want.", icon: "💳" },
            { title: "Savings Goals", desc: "Set targets, track progress, and watch your money grow.", icon: "🐷" },
            { title: "Debt Tracking", desc: "Track balances, payments, and interest rates. Choose snowball or avalanche.", icon: "📉" },
            { title: "Monthly Reviews", desc: "Reflect on what worked, what didn't, and plan next month.", icon: "📋" },
            { title: "Export Data", desc: "Download your financial data as CSV anytime.", icon: "📤" },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-100 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-xl">{f.icon}</div>
              <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 px-6 py-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-slate-500">My-Girls-App — Enterprise-grade financial management with banking-level security.</p>
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Powered by <span className="text-primary font-bold">SDWJR</span>
            <span className="ml-1 text-slate-500 font-normal">— Software &amp; Database Developer</span>
          </p>
        </div>
      </footer>
    </main>
  );
}

function SecurityFeature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-primary text-lg">{icon === "shield" ? "🛡" : icon === "lock" ? "🔒" : icon === "key" ? "🔑" : "🖥"}</span>
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <p className="mt-1 text-xs text-slate-400">{desc}</p>
    </div>
  );
}