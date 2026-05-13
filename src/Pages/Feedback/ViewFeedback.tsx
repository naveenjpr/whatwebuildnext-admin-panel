import { useMemo, useState } from "react"

type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  isActive: boolean
}

type Draft = Pick<Testimonial, "name" | "role" | "company" | "content" | "avatar">

export default function ViewFeedback() {
  const [rows, setRows] = useState<Testimonial[]>(() => TESTIMONIALS)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [draft, setDraft] = useState<Draft>({
    name: "",
    role: "",
    company: "",
    content: "",
    avatar: "",
  })

  const activeCount = useMemo(() => rows.filter((r) => r.isActive).length, [rows])

  function onToggleStatus(id: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)))
  }

  function onDelete(id: string) {
    // UI-only for now; hook to API later
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  function onEditOpen(t: Testimonial) {
    setEditing(t)
    setDraft({
      name: t.name,
      role: t.role,
      company: t.company,
      content: t.content,
      avatar: t.avatar,
    })
  }

  function onEditSave() {
    if (!editing) return
    setRows((prev) =>
      prev.map((r) =>
        r.id === editing.id
          ? {
              ...r,
              ...draft,
            }
          : r
      )
    )
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="text-white text-2xl font-semibold tracking-tight">Feedback</div>
          <div className="text-white/55 mt-1">Voice of our partners — website testimonials section.</div>
          <div className="text-white/45 text-sm mt-2">
            Active: <span className="text-white/80 font-mono">{activeCount}</span> /{" "}
            <span className="text-white/80 font-mono">{rows.length}</span>
          </div>
        </div>
        <a
          href="/testimonials/add"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]"
        >
          Add Feedback
        </a>
      </div>

      <div className="text-center py-2">
        <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-xs mb-4 block">
          Feedback
        </span>
        <h2 className="text-3xl md:text-4xl font-black mb-2 text-white">
          Voice of Our{" "}
          <span className="bg-linear-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            Partners.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rows.map((t) => (
          <div
            key={t.id}
            className="p-7 rounded-[32px] relative flex flex-col border border-white/10 bg-white/3 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="absolute top-6 right-6 text-blue-400/20" aria-hidden="true">
              <QuoteIcon />
            </div>

            <p className="text-slate-300 italic mb-8 relative z-10 font-light leading-relaxed">
              “{t.content}”
            </p>

            <div className="mt-auto">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span
                  className={[
                    "inline-flex items-center h-7 px-3 rounded-full text-xs border font-mono",
                    t.isActive
                      ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-200 border-rose-500/20",
                  ].join(" ")}
                >
                  {t.isActive ? "status: true" : "status: false"}
                </span>

                <button
                  type="button"
                  onClick={() => onToggleStatus(t.id)}
                  className="h-8 px-3 rounded-xl bg-white/5 border border-white/10 text-white/75 hover:text-white hover:bg-white/10 transition text-xs"
                >
                  Toggle
                </button>
              </div>

              <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full border-2 border-blue-500/30 object-cover"
              />
              <div className="min-w-0">
                <h4 className="text-white font-bold text-sm truncate">{t.name}</h4>
                <p className="text-slate-500 text-xs uppercase tracking-wider truncate">
                  {t.role}, {t.company}
                </p>
              </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => onEditOpen(t)}
                  className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition text-sm"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(t.id)}
                  className="h-9 px-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 hover:bg-rose-500/15 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setEditing(null)}
            aria-label="Close edit modal"
          />

          <div className="relative mx-auto mt-24 w-[min(760px,92vw)] rounded-2xl border border-white/10 bg-[#0b1220] shadow-[0_18px_80px_rgba(0,0,0,0.7)]">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">Edit Feedback</div>
                <div className="text-white/55 text-sm">Update fields and save.</div>
              </div>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Name"
                value={draft.name}
                onChange={(v) => setDraft((p) => ({ ...p, name: v }))}
              />
              <Field
                label="Role"
                value={draft.role}
                onChange={(v) => setDraft((p) => ({ ...p, role: v }))}
              />
              <Field
                label="Company"
                value={draft.company}
                onChange={(v) => setDraft((p) => ({ ...p, company: v }))}
                className="md:col-span-2"
              />
              <Field
                label="Avatar URL"
                value={draft.avatar}
                onChange={(v) => setDraft((p) => ({ ...p, avatar: v }))}
                className="md:col-span-2"
              />
              <TextArea
                label="Content"
                value={draft.content}
                onChange={(v) => setDraft((p) => ({ ...p, content: v }))}
                className="md:col-span-2"
              />
            </div>

            <div className="p-5 border-t border-white/10 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onEditSave}
                className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "James Wilson",
    role: "CTO",
    company: "FinTech Hub",
    content:
      "What we build next transformed our legacy platform into a high-speed React dashboard in record time. Their attention to technical detail is unmatched.",
    avatar: "/images/default_avatar.png",
    isActive: true,
  },
  {
    id: "2",
    name: "Lila Rodriguez",
    role: "Product Owner",
    company: "EcoStream",
    content: "The web app they built using React/next handles massive traffic flawlessly. Engineering at its finest.",
    avatar: "/images/default_avatar.png",
    isActive: true,
  },
  {
    id: "3",
    name: "Pritam Kumar",
    role: "Founder",
    company: "Healthhepta",
    content:
      "Building a scalable healthcare platform was smooth and reliable thanks to the secure, high-performance system what we build next delivered. It helped us serve patients efficiently while maintaining data privacy and trust.",
    avatar: "/images/default_avatar.png",
    isActive: false,
  },
]

function Field({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  className?: string
}) {
  return (
    <label className={["block space-y-2", className].join(" ")}>
      <div className="text-sm text-white/70">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
      />
    </label>
  )
}

function TextArea({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  className?: string
}) {
  return (
    <label className={["block space-y-2", className].join(" ")}>
      <div className="text-sm text-white/70">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
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
