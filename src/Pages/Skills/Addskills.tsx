import { useMemo, useState } from "react"

const CATEGORIES = ["Frontend", "Backend", "Databases", "DevOps & Cloud", "Tools & Platforms", "CMS & Others"]

const TECH_STACK = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Redux",
  "Tailwind CSS",
  "Bootstrap",
  "Node.js",
  "Express.js",
  "Python",
  "Django",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "AWS S3",
  "AWS Lambda",
  "Nginx",
  "PM2",
  "Git",
  "GitHub",
  "Postman",
  "Figma",
  "Canva",
  "WordPress",
  "SEO",
  "Razorpay",
  "JWT Authentication",
]

export default function Addskills() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState(CATEGORIES[0])

  const exists = useMemo(
    () => TECH_STACK.some((tech) => tech.toLowerCase() === name.trim().toLowerCase()),
    [name]
  )

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">Add Skill</div>
          <div className="text-white/55 mt-1">Add a technology to the website tech stack section.</div>
        </div>
        <a
          href="/skills/view"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          View Skills
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)] space-y-4">
          <Field label="Skill Name" value={name} setValue={setName} placeholder="React Native" />

          <label className="block space-y-2">
            <div className="text-sm text-white/70">Category</div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-[#0b1220]">
                  {c}
                </option>
              ))}
            </select>
          </label>

          <div className="text-sm">
            {exists ? (
              <span className="text-amber-300">This skill already exists in TECH_STACK.</span>
            ) : (
              <span className="text-emerald-300">This skill is new.</span>
            )}
          </div>

          <div className="flex gap-2">
            <button className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition">
              Save draft
            </button>
            <button className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]">
              Publish
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <div className="text-white font-semibold">Preview</div>
          <div className="text-white/55 text-sm mt-1">How it appears in skill chips.</div>

          <div className="mt-5 space-y-3">
            <div className="text-xs text-white/50 uppercase tracking-wider">{category}</div>
            <div className="inline-flex items-center h-9 px-4 rounded-full bg-white/5 border border-white/10 text-white/85">
              {name.trim() || "New Skill"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  setValue,
  placeholder,
}: {
  label: string
  value: string
  setValue: (v: string) => void
  placeholder: string
}) {
  return (
    <label className="block space-y-2">
      <div className="text-sm text-white/70">{label}</div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
      />
    </label>
  )
}
