export default function AddFeedback() {
  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">Add Feedback</div>
          <div className="text-white/55 mt-1">Create a testimonial card like the website section.</div>
        </div>
        <a
          href="/testimonials/view"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          View Feedback
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <div className="text-white font-semibold">Details</div>
          <div className="text-white/55 text-sm mt-1">Fill fields and publish (API hookup later).</div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name" placeholder="James Wilson" />
            <Field label="Role" placeholder="CTO" />
            <Field label="Company" placeholder="FinTech Hub" className="md:col-span-2" />
            <Field label="Avatar URL" placeholder="/images/default_avatar.png" className="md:col-span-2" />
            <TextArea
              label="Content"
              placeholder="What we build next transformed our legacy platform..."
              className="md:col-span-2"
            />
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
          <div className="text-white/55 text-sm mt-1">This is how it will look on the website.</div>

          <div className="mt-5 p-7 rounded-[32px] relative flex flex-col border border-white/10 bg-white/3">
            <div className="absolute top-6 right-6 text-blue-400/20" aria-hidden="true">
              <QuoteIcon />
            </div>

            <p className="text-slate-300 italic mb-8 relative z-10 font-light leading-relaxed">
              “What we build next transformed our legacy platform into a high-speed React dashboard in record time.
              Their attention to technical detail is unmatched.”
            </p>

            <div className="mt-auto flex items-center gap-4">
              <img
                src="/images/default_avatar.png"
                alt="Preview avatar"
                className="w-12 h-12 rounded-full border-2 border-blue-500/30 object-cover"
              />
              <div>
                <h4 className="text-white font-bold text-sm">James Wilson</h4>
                <p className="text-slate-500 text-xs uppercase tracking-wider">CTO, FinTech Hub</p>
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
        rows={5}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25 resize-none"
      />
    </label>
  )
}

function QuoteIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.2 11.5H6.8c.2-2.2 1.4-3.5 3.5-4.1V5.2C6.8 6 5 8.4 5 12v6h5.2v-6.5Zm8 0h-3.4c.2-2.2 1.4-3.5 3.5-4.1V5.2c-3.5.8-5.3 3.2-5.3 6.8v6h5.2v-6.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
