export default function Settings() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-white/55 text-2xl font-semibold">Settings</h1>
        <p className="text-white/55 mt-1">Control notifications, security and preferences.</p>
      </div>

      <div className="space-y-4">
        <SettingRow title="Email Notifications" desc="Get updates for new inquiries and comments." />
        <SettingRow title="Two-Factor Authentication" desc="Add an extra layer of login security." />
        <SettingRow title="Auto Save Drafts" desc="Automatically save changes every few seconds." />
      </div>
    </div>
  )
}

function SettingRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)] flex items-center justify-between gap-4">
      <div>
        <div className="text-white font-medium">{title}</div>
        <div className="text-white/55 text-sm mt-1">{desc}</div>
      </div>
      <button className="h-8 px-3 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm">
        Enabled
      </button>
    </div>
  )
}
