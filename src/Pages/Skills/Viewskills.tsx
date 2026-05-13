import { useMemo, useState } from "react"

type Skill = {
  id: string
  name: string
  category: string
  isActive: boolean
}

const SKILL_GROUPS: Record<string, string[]> = {
  Frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Redux", "Tailwind CSS", "Bootstrap"],
  Backend: ["Node.js", "Express.js", "Python", "Django", "FastAPI"],
  Databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis"],
  "DevOps & Cloud": ["Docker", "Kubernetes", "AWS", "AWS S3", "AWS Lambda", "Nginx", "PM2"],
  "Tools & Platforms": ["Git", "GitHub", "Postman", "Figma", "Canva"],
  "CMS & Others": ["WordPress", "SEO", "Razorpay", "JWT Authentication"],
}

const INITIAL_SKILLS: Skill[] = Object.entries(SKILL_GROUPS).flatMap(([category, names]) =>
  names.map((name, idx) => ({
    id: `${category}-${idx + 1}`,
    name,
    category,
    isActive: true,
  }))
)

export default function Viewskills() {
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [editName, setEditName] = useState("")

  const grouped = useMemo(() => {
    const map = new Map<string, Skill[]>()
    skills.forEach((s) => {
      if (!map.has(s.category)) map.set(s.category, [])
      map.get(s.category)?.push(s)
    })
    return Array.from(map.entries())
  }, [skills])

  const activeCount = skills.filter((s) => s.isActive).length

  function toggleStatus(id: string) {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)))
  }

  function removeSkill(id: string) {
    setSkills((prev) => prev.filter((s) => s.id !== id))
  }

  function openEdit(skill: Skill) {
    setEditing(skill)
    setEditName(skill.name)
  }

  function saveEdit() {
    if (!editing) return
    const name = editName.trim()
    if (!name) return
    setSkills((prev) => prev.map((s) => (s.id === editing.id ? { ...s, name } : s)))
    setEditing(null)
    setEditName("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">Skills / Tech Stack</div>
          <div className="text-white/55 mt-1">Manage skills shown in the website stack section.</div>
          <div className="text-white/45 text-sm mt-2">
            Active: <span className="text-white/80 font-mono">{activeCount}</span> /{" "}
            <span className="text-white/80 font-mono">{skills.length}</span>
          </div>
        </div>
        <a
          href="/skills/add"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]"
        >
          Add Skill
        </a>
      </div>

      <div className="space-y-5">
        {grouped.map(([category, list]) => (
          <div
            key={category}
            className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-white font-semibold">{category}</h3>
              <span className="text-xs text-white/50 font-mono">{list.length} skills</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {list.map((skill) => (
                <div
                  key={skill.id}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 flex items-center gap-2"
                >
                  <span className="text-white/85 text-sm">{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => toggleStatus(skill.id)}
                    className={[
                      "h-6 px-2 rounded-md text-[10px] border font-mono",
                      skill.isActive
                        ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-200 border-rose-500/30",
                    ].join(" ")}
                  >
                    {skill.isActive ? "true" : "false"}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(skill)}
                    className="h-6 px-2 rounded-md text-[10px] bg-white/5 border border-white/10 text-white/75"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="h-6 px-2 rounded-md text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-200"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {editing ? (
        <div className="fixed inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-black/60" onClick={() => setEditing(null)} />
          <div className="relative mx-auto mt-28 w-[min(520px,92vw)] rounded-2xl border border-white/10 bg-[#0b1220] shadow-[0_18px_80px_rgba(0,0,0,0.7)] p-5 space-y-4">
            <div>
              <div className="text-white font-semibold">Edit Skill</div>
              <div className="text-white/55 text-sm">{editing.category}</div>
            </div>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold"
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
