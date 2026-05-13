export default function AddMeettheExperts() {
  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">Add Expert</div>
          <div className="text-white/55 mt-1">Create a new team member card (UI ready).</div>
        </div>
        <a
          href="/team/view"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          View Team
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <div className="text-white font-semibold">Details</div>
          <div className="text-white/55 text-sm mt-1">
            Fill fields and publish (API hookup later).
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name" placeholder="Naveen Saini" />
            <Field label="Role" placeholder="Full Stack Developer" />
            <Field label="Image URL" placeholder="/images/naveen.JPG" className="md:col-span-2" />
            <TextArea
              label="Skills (comma separated)"
              placeholder="React.js, Tailwind CSS, AWS, TypeScript..."
              className="md:col-span-2"
            />
            <Field label="GitHub" placeholder="https://github.com/..." />
            <Field label="LinkedIn" placeholder="https://linkedin.com/in/..." />
            <Field label="Live Demo" placeholder="https://yourname.whatwebuildnext.com/" className="md:col-span-2" />
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

        <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <div className="text-white font-semibold">Preview</div>
          <div className="text-white/55 text-sm mt-1">Card preview (same style as View page).</div>

          <div className="mt-5 rounded-[32px] border border-white/10 bg-white/3 overflow-hidden">
            <div className="p-6 flex items-start gap-4">
              <img
                src="/images/default_avatar.png"
                alt="Preview"
                className="w-14 h-14 rounded-2xl object-cover border border-white/10 bg-white/5"
              />
              <div className="min-w-0 flex-1">
                <div className="text-white font-bold truncate">Naveen Saini</div>
                <div className="text-slate-400 text-sm truncate">Full Stack Developer</div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center h-7 px-3 rounded-full text-xs border font-mono bg-emerald-500/10 text-emerald-200 border-emerald-500/20">
                    status: true
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-wrap gap-2">
                {["React.js", "Tailwind CSS", "AWS", "TypeScript", "Next.js", "Node.js"].map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center h-7 px-3 rounded-full text-xs bg-white/5 border border-white/10 text-white/70"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="h-9 inline-flex items-center px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm">
                  GitHub
                </span>
                <span className="h-9 inline-flex items-center px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm">
                  LinkedIn
                </span>
                <span className="h-9 inline-flex items-center px-3 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.18)] text-sm">
                  Live Demo
                </span>
              </div>
            </div>
          </div>
        </div>
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

function TextArea({
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
      <textarea
        placeholder={placeholder}
        rows={6}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25 resize-none"
      />
    </label>
  )
}
