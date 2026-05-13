export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="text-white text-2xl font-semibold tracking-tight">Dashboard</div>
          <div className="text-white/55 mt-1">
            The future of engineering is here — manage content, portfolio, and leads.
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition">
            Watch Reel
          </button>
          <button className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]">
            Launch Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Deployments" value="10+" hint="Shipped builds" />
        <StatCard label="Engineers" value="6+" hint="Core team" />
        <StatCard label="Client Uptime" value="99.9%" hint="Reliability" />
        <StatCard label="Awards" value="5" hint="Recognitions" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">Recent Leads</div>
              <div className="text-white/55 text-sm mt-1">Latest inquiries from the website.</div>
            </div>
            <button className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition">
              View all
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <div className="grid grid-cols-12 bg-white/5 px-4 py-3 text-xs text-white/60 font-medium">
              <div className="col-span-4">Name</div>
              <div className="col-span-4">Company</div>
              <div className="col-span-3">Service</div>
              <div className="col-span-1 text-right">Age</div>
            </div>
            {LEADS.map((l) => (
              <div
                key={l.name}
                className="grid grid-cols-12 px-4 py-3 text-sm border-t border-white/10 hover:bg-white/5 transition"
              >
                <div className="col-span-4 text-white/90">{l.name}</div>
                <div className="col-span-4 text-white/70">{l.company}</div>
                <div className="col-span-3 text-white/70">{l.service}</div>
                <div className="col-span-1 text-right text-white/55 font-mono">{l.age}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="text-white font-semibold">Quick Actions</div>
          <div className="text-white/55 text-sm mt-1">Common tasks to move faster.</div>

          <div className="mt-4 space-y-2">
            <ActionRow title="Add Case Study" desc="Publish new project work" />
            <ActionRow title="Upload Portfolio" desc="Add images + details" />
            <ActionRow title="Team Member" desc="Update profiles & skills" />
            <ActionRow title="Messages" desc="Reply to client inquiries" />
          </div>

          <div className="mt-5 rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-white/80 text-sm font-mono">
              {`class Solution { constructor() { this.quality = Infinity; this.innovation = true; } }`}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/3 shadow-[0_10px_40px_rgba(0,0,0,0.25)]",
        "p-5 backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
      <div className="text-white/60 text-sm">{label}</div>
      <div className="mt-2 text-white text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-white/45 text-sm">{hint}</div>
    </div>
  )
}

function ActionRow({ title, desc }: { title: string; desc: string }) {
  return (
    <button
      type="button"
      className="w-full text-left rounded-xl border border-white/10 bg-white/2 hover:bg-white/5 transition p-3"
    >
      <div className="text-white/90 font-medium">{title}</div>
      <div className="text-white/55 text-sm">{desc}</div>
    </button>
  )
}

const LEADS = [
  { name: "James Wilson", company: "FinTech Hub", service: "Custom Web Apps", age: "2h" },
  { name: "Lila Rodriguez", company: "EcoStream", service: "Cloud Infra", age: "1d" },
  { name: "Pritam Kumar", company: "Healthhepta", service: "Backend Systems", age: "3d" },
]
