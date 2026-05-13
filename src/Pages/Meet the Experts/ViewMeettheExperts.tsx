import { useMemo, useState } from "react"

type Socials = { github: string; linkedin: string; LiveDemo: string }

type TeamMember = {
  id: string
  name: string
  role: string
  image: string
  skills: string[]
  socials: Socials
  isActive: boolean
}

type Draft = {
  name: string
  role: string
  image: string
  skillsText: string
  github: string
  linkedin: string
  LiveDemo: string
}

export default function ViewMeettheExperts() {
  const [rows, setRows] = useState<TeamMember[]>(() => TEAM.map((m) => ({ ...m, isActive: true })))
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [draft, setDraft] = useState<Draft>({
    name: "",
    role: "",
    image: "",
    skillsText: "",
    github: "",
    linkedin: "",
    LiveDemo: "",
  })

  const activeCount = useMemo(() => rows.filter((r) => r.isActive).length, [rows])

  function toggleStatus(id: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)))
  }

  function remove(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  function openEdit(m: TeamMember) {
    setEditing(m)
    setDraft({
      name: m.name,
      role: m.role,
      image: m.image,
      skillsText: m.skills.join(", "),
      github: m.socials.github,
      linkedin: m.socials.linkedin,
      LiveDemo: m.socials.LiveDemo,
    })
  }

  function saveEdit() {
    if (!editing) return
    const skills = draft.skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    setRows((prev) =>
      prev.map((r) =>
        r.id === editing.id
          ? {
              ...r,
              name: draft.name,
              role: draft.role,
              image: draft.image,
              skills,
              socials: { github: draft.github, linkedin: draft.linkedin, LiveDemo: draft.LiveDemo },
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
          <div className="text-white text-2xl font-semibold tracking-tight">Team (Experts)</div>
          <div className="text-white/55 mt-1">Manage “Meet the Experts” section for the website.</div>
          <div className="text-white/45 text-sm mt-2">
            Active: <span className="text-white/80 font-mono">{activeCount}</span> /{" "}
            <span className="text-white/80 font-mono">{rows.length}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href="/team/add"
            className="h-10 inline-flex items-center px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]"
          >
            Add Expert
          </a>
          <a
            href="/team/view"
            className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            Refresh
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rows.map((m) => (
          <div
            key={m.id}
            className="rounded-[32px] border border-white/10 bg-white/3 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col"
          >
            <div className="p-6 flex items-start gap-4">
              <img
                src={m.image}
                alt={m.name}
                className="w-14 h-14 rounded-2xl object-cover border border-white/10 bg-white/5"
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).src = "/images/default_avatar.png"
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="text-white font-bold truncate">{m.name}</div>
                <div className="text-slate-400 text-sm truncate">{m.role}</div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span
                    className={[
                      "inline-flex items-center h-7 px-3 rounded-full text-xs border font-mono",
                      m.isActive
                        ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-200 border-rose-500/20",
                    ].join(" ")}
                  >
                    {m.isActive ? "status: true" : "status: false"}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleStatus(m.id)}
                    className="h-8 px-3 rounded-xl bg-white/5 border border-white/10 text-white/75 hover:text-white hover:bg-white/10 transition text-xs"
                  >
                    Toggle
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="flex flex-wrap gap-2">
                {m.skills.slice(0, 12).map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center h-7 px-3 rounded-full text-xs bg-white/5 border border-white/10 text-white/70"
                  >
                    {s}
                  </span>
                ))}
                {m.skills.length > 12 ? (
                  <span className="inline-flex items-center h-7 px-3 rounded-full text-xs bg-white/2 border border-white/10 text-white/50 font-mono">
                    +{m.skills.length - 12}
                  </span>
                ) : null}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={m.socials.github || "#"}
                  target="_blank"
                  className="h-9 inline-flex items-center px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition text-sm"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={m.socials.linkedin || "#"}
                  target="_blank"
                  className="h-9 inline-flex items-center px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition text-sm"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={m.socials.LiveDemo || "#"}
                  target="_blank"
                  className="h-9 inline-flex items-center px-3 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.18)] text-sm"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(m)}
                  className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition text-sm"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(m.id)}
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
        <EditModal
          member={editing}
          draft={draft}
          setDraft={setDraft}
          onClose={() => setEditing(null)}
          onSave={saveEdit}
        />
      ) : null}
    </div>
  )
}

function EditModal({
  member,
  draft,
  setDraft,
  onClose,
  onSave,
}: {
  member: TeamMember
  draft: Draft
  setDraft: React.Dispatch<React.SetStateAction<Draft>>
  onClose: () => void
  onSave: () => void
}) {
  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-black/60" onClick={onClose} aria-label="Close edit modal" />
      <div className="relative mx-auto mt-24 w-[min(920px,92vw)] rounded-2xl border border-white/10 bg-[#0b1220] shadow-[0_18px_80px_rgba(0,0,0,0.7)]">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-white font-semibold">Edit Expert</div>
            <div className="text-white/55 text-sm">{member.name}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            Close
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name" value={draft.name} onChange={(v) => setDraft((p) => ({ ...p, name: v }))} />
          <Field label="Role" value={draft.role} onChange={(v) => setDraft((p) => ({ ...p, role: v }))} />
          <Field
            label="Image URL"
            value={draft.image}
            onChange={(v) => setDraft((p) => ({ ...p, image: v }))}
            className="md:col-span-2"
          />
          <TextArea
            label="Skills (comma separated)"
            value={draft.skillsText}
            onChange={(v) => setDraft((p) => ({ ...p, skillsText: v }))}
            className="md:col-span-2"
          />
          <Field label="GitHub" value={draft.github} onChange={(v) => setDraft((p) => ({ ...p, github: v }))} />
          <Field
            label="LinkedIn"
            value={draft.linkedin}
            onChange={(v) => setDraft((p) => ({ ...p, linkedin: v }))}
          />
          <Field
            label="Live Demo"
            value={draft.LiveDemo}
            onChange={(v) => setDraft((p) => ({ ...p, LiveDemo: v }))}
            className="md:col-span-2"
          />
        </div>

        <div className="p-5 border-t border-white/10 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

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
        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25"
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
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25 resize-none"
      />
    </label>
  )
}

// Note: keeping paths as /images/... so you can place files in /public/images/
const TEAM: Omit<TeamMember, "isActive">[] = [
  {
    id: "1",
    name: "Naveen Saini",
    role: "Full Stack Developer",
    image: "/images/naveen.JPG",
    skills: [
      "System Design",
      "React.js",
      "Tailwind CSS",
      "AWS",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Gemini AI",
      "Dynamic API",
      "Angular",
      "HTML5",
      "Bootstrap",
      "CSS3",
      "JavaScript",
      "MongoDB",
      "PostgreSQL",
      "wordpress",
    ],
    socials: {
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/in/naveen-saini-78201a293/",
      LiveDemo: "https://naveen.whatwebuildnext.com/",
    },
  },
  {
    id: "2",
    name: "Ayush Singh Chouhan",
    role: "Frontend and Backend Specialist",
    image: "/images/ayush1.png",
    skills: [
      "System Design",
      "React.js",
      "Tailwind CSS",
      "AWS",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Angular",
      "MVC",
      "HTML",
      "Bootstrap",
      "CSS",
      "JavaScript",
      "MongoDB",
      "PostgreSQL",
      "python",
      "microservices",
      "docker",
    ],
    socials: {
      github: "https://github.com/Jeratos",
      linkedin: "https://www.linkedin.com/in/ayush-chouhan-31a064222/",
      LiveDemo: "https://ayush.whatwebuildnext.com/",
    },
  },
  {
    id: "3",
    name: "Barinder Singh",
    role: "DevOps Engineer",
    image: "/images/barindar.jpeg",
    skills: [
      "System Design",
      "React.js",
      "Tailwind CSS",
      "AWS",
      "TypeScript",
      "Next.js",
      "Node.js API",
      "React",
      "Node.js",
      "Gemini AI",
      "Dynamic API",
      "Angular",
      "MVC",
      "HTML5",
      "Bootstrap",
      "CSS3",
      "JavaScript",
      "MongoDB",
      "wordpress",
      "python",
      "docker",
    ],
    socials: {
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/in/naveen-saini-78201a293/",
      LiveDemo: "https://my-portfolio-azure-omega-11.vercel.app/",
    },
  },
  {
    id: "4",
    name: "Arijit Mondal",
    role: "Full-Stack Developer",
    image: "/images/arijit.jpg",
    skills: [
      "System Design",
      "AWS",
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Express.js",
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind CSS",
      "MongoDB",
      "SQL",
      "python",
      "docker",
    ],
    socials: {
      github: "https://github.com/Arijit-mondal099",
      linkedin: "https://www.linkedin.com/in/arijit-mondal-211217287",
      LiveDemo: "https://arijitmondal.vercel.app/",
    },
  },
  {
    id: "5",
    name: "Kamran Hashmi",
    role: "App Developer",
    image: "/images/kamran.jpeg",
    skills: [
      "System Design",
      "Tailwind CSS",
      "Supabase",
      "AWS",
      "Flutter",
      "dart",
      "Node.js",
      "Gemini AI",
      "Dynamic API",
      "MVC",
      "HTML5",
      "Bootstrap",
      "CSS3",
      "JavaScript",
      "MongoDB",
      "postgreSQL",
    ],
    socials: {
      github: "https://github.com/K-hashmi9065",
      linkedin: "https://www.linkedin.com/in/k-hashmi9065/",
      LiveDemo: "https://kamran-portfolio-gilt.vercel.app/",
    },
  },
  {
    id: "6",
    name: "Alok Raj",
    role: "Cloud Architect",
    image: "/images/alok.jpeg",
    skills: [
      "System Design",
      "React.js",
      "Tailwind CSS",
      "AWS",
      "TypeScript",
      "Next.js",
      "Node.js API",
      "React",
      "Node.js",
      "Gemini AI",
      "Dynamic API",
      "Angular",
      "MVC",
      "HTML5",
      "Bootstrap",
      "CSS3",
      "JavaScript",
      "MongoDB",
      "wordpress",
      "python",
      "docker",
    ],
    socials: {
      github: "https://github.com/raj45alok",
      linkedin: "https://www.linkedin.com/in/alokraj54/",
      LiveDemo: "https://my-portfolio-azure-omega-11.vercel.app/",
    },
  },
  {
    id: "7",
    name: "Mohammad Parwez",
    role: "Full Stack Developer",
    image: "/images/pawez.jpeg",
    skills: [
      "System Design",
      "React.js",
      "Tailwind CSS",
      "AWS",
      "TypeScript",
      "Next.js",
      "Node.js API",
      "React",
      "Node.js",
      "Gemini AI",
      "Dynamic API",
      "Angular",
      "MVC",
      "HTML5",
      "Bootstrap",
      "CSS3",
      "JavaScript",
      "MongoDB",
      "wordpress",
      "python",
      "docker",
    ],
    socials: {
      github: "https://github.com/Mohammad-Parwez",
      linkedin: "https://www.linkedin.com/in/mohammad-parwez-47b972247",
      LiveDemo: "https://portfolio-ten-lilac-avdvtc47yu.vercel.app/",
    },
  },
  {
    id: "8",
    name: "Kaif Reza",
    role: "Video Editor",
    image: "/images/kaif.jpeg",
    skills: [
      "Video Editing",
      "Adobe Premiere Pro",
      "Adobe Photoshop",
      "CapCut Editing",
      "Canva Design",
      "AI Video Editing Tools",
      "AI Voice / Voiceover Tools",
      "Short-form Content Editing",
      "Color Correction & Color Grading",
      "Transitions & Effects",
      "Audio Editing & Sync",
      "Storytelling & Content Structuring",
      "Social Media Content Creation",
      "Fast Delivery & Client Handling",
    ],
    socials: {
      github: "",
      linkedin: "",
      LiveDemo: "",
    },
  },
]
