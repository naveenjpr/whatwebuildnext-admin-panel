export default function AddSociallyEngaged() {
  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">Socially Engaged</div>
          <div className="text-white/55 mt-1">Add or update your social links (website footer section).</div>
        </div>
        <a
          href="/socially-engaged/view"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          View
        </a>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        <div className="text-white font-semibold">Icons</div>
        <div className="text-white/55 text-sm mt-1">
          Select a platform and paste the URL. Matches the tile style shown in your image.
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <IconTile label="Twitter" />
          <IconTile label="GitHub" />
          <IconTile label="LinkedIn" />
          <IconTile label="YouTube" />
          <IconTile label="Instagram" />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Twitter URL" placeholder="https://x.com/whatwebuildnext" />
          <Field label="GitHub URL" placeholder="https://github.com/..." />
          <Field label="LinkedIn URL" placeholder="https://linkedin.com/in/..." />
          <Field label="YouTube URL" placeholder="https://youtube.com/@..." />
          <Field label="Instagram URL" placeholder="https://instagram.com/..." className="md:col-span-2" />
        </div>

        <div className="mt-5 flex gap-2">
          <button className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition">
            Save draft
          </button>
          <button className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]">
            Publish
          </button>
        </div>
      </div>
    </div>
  )
}

function IconTile({ label }: { label: string }) {
  return (
    <div className="h-14 w-14 rounded-2xl border border-white/10 bg-white/2 shadow-[0_14px_30px_rgba(0,0,0,0.35)] grid place-items-center">
      <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/80 text-xs font-mono">
        {label.slice(0, 2).toUpperCase()}
      </div>
    </div>
  )
}

function Field({
  label,
  placeholder,
  className = "",
}: {
  label: string
  placeholder: string
  className?: string
}) {
  return (
    <label className={["block space-y-2", className].join(" ")}>
      <div className="text-sm text-white/70">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
      />
    </label>
  )
}
