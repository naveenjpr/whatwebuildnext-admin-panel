import { useState } from "react"

type Project = {
  id: string
  title: string
  category: string
  image: string
  tags: string[]
  github: string
  liveUrl: string
  frontendRepo: string
  backendRepo: string
  status: "active" | "deactive"
  featureStatus: boolean
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "DroneTv",
    category:
      "Developed a full-featured web platform that allows businesses in the drone industry to list their companies, professionals, and events. Full-Stack AI Powered SAAS Application.",
    image: "/images/dronetv.png",
    tags: ["React", "Typescript", "OpenAI", "Tailwind CSS", "AWS"],
    github: "https://github.com/gisipageums-droid/Dronetv/tree/main",
    liveUrl: "https://www.dronetv.in",
    frontendRepo: "https://github.com/user/project-ui",
    backendRepo: "https://github.com/user/project-api",
    status: "active",
    featureStatus: true,
  },
  {
    id: "2",
    title: "Health",
    category:
      "Full-Stack Doctor appointment booking application. Aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.",
    image: "/images/health.png",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/Arijit-mondal099/health",
    liveUrl: "https://health-frontend-c4x4.onrender.com/",
    frontendRepo: "https://github.com/user/project-ui",
    backendRepo: "https://github.com/user/project-api",
    status: "active",
    featureStatus: false,
  },
  {
    id: "3",
    title: "PhishFarm",
    category:
      "Diagnosed and resolved critical bugs in the production environment, optimized application performance, and successfully managed end-to-end project deployment workflows.",
    image: "/images/PhishFarm.jpeg",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "typescript", "tailwind css"],
    github: "#",
    liveUrl: "https://www.phishfarm.com",
    frontendRepo: "https://github.com/user/project-ui",
    backendRepo: "https://github.com/user/project-api",
    status: "deactive",
    featureStatus: false,
  },
  {
    id: "4",
    title: "ETS (Employee Tracking System)",
    category:
      "A SaaS platform developed at iPageums to track employee activity, attendance, and project statuses. Includes a real-time chat section for colleagues.",
    image: "/images/ETS.png",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "AWS", "typescript", "tailwind css"],
    github: "#",
    liveUrl: "https://ipageets.vercel.app/",
    frontendRepo: "https://github.com/user/project-ui",
    backendRepo: "https://github.com/user/project-api",
    status: "active",
    featureStatus: true,
  },
  {
    id: "5",
    title: "aiyuh app",
    category:
      "Aiyuh is a health tracking mobile application built using Flutter and Supabase that monitors user health metrics and provides personalized diet recommendations based on real-time data and user inputs.",
    image: "/images/aiyuh.jpeg",
    tags: ["Flutter", "Dart", "Supabase", "postgreSQL", "socket.io"],
    github: "#",
    liveUrl: "https://play.google.com/store/apps/details?id=com.aiyuh.user&pcampaignid=web_share",
    frontendRepo: "https://github.com/user/project-ui",
    backendRepo: "https://github.com/user/project-api",
    status: "deactive",
    featureStatus: false,
  },
  {
    id: "6",
    title: "PaisaBchao (price comparison website)",
    category:
      "The ultimate price comparison platform for smart shoppers in India. We scan thousands of products across all major platforms to find you the best value.",
    image: "/images/paisabchao.png",
    tags: ["Next.js", "Node.js", "Express.js", "PostgreSQL", "openai", "socket.io", "typescript", "tailwind css"],
    github: "#",
    liveUrl: "https://www.paisabchao.com/",
    frontendRepo: "https://github.com/user/project-ui",
    backendRepo: "https://github.com/user/project-api",
    status: "active",
    featureStatus: true,
  },
]

export default function ViewPortfolio() {
  const [rows, setRows] = useState<Project[]>(PROJECTS)

  function toggleStatus(id: string) {
    setRows((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "deactive" : "active" }
          : p
      )
    )
  }

  function toggleFeatureStatus(id: string) {
    setRows((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featureStatus: !p.featureStatus } : p))
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">View Portfolio</div>
          <div className="text-white/55 mt-1">Projects list in the same format as website JSON.</div>
        </div>
        <a
          href="/portfolio/add"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]"
        >
          Add new
        </a>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {rows.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)] overflow-hidden"
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-52 object-cover bg-[#0b1020]"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).src = "/images/default_avatar.png"
              }}
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-white text-lg font-semibold">{p.title}</h3>
                <span className="text-xs text-white/50 font-mono">id: {p.id}</span>
              </div>
              <p className="text-white/65 text-sm leading-relaxed mt-2">{p.category}</p>

              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span
                  className={[
                    "inline-flex items-center h-7 px-3 rounded-full text-xs border font-mono",
                    p.status === "active"
                      ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-200 border-rose-500/20",
                  ].join(" ")}
                >
                  status: {p.status}
                </span>
                <button
                  type="button"
                  onClick={() => toggleStatus(p.id)}
                  className="h-7 px-2 rounded-md text-[10px] bg-white/5 border border-white/10 text-white/80"
                >
                  Toggle Status
                </button>
                <span
                  className={[
                    "inline-flex items-center h-7 px-3 rounded-full text-xs border font-mono",
                    p.featureStatus
                      ? "bg-indigo-500/15 text-indigo-200 border-indigo-500/25"
                      : "bg-slate-500/15 text-slate-200 border-slate-500/25",
                  ].join(" ")}
                >
                  feature: {String(p.featureStatus)}
                </span>
                <button
                  type="button"
                  onClick={() => toggleFeatureStatus(p.id)}
                  className="h-7 px-2 rounded-md text-[10px] bg-white/5 border border-white/10 text-white/80"
                >
                  Toggle Feature
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={`${p.id}-${tag}`}
                    className="inline-flex items-center h-7 px-3 rounded-full text-xs bg-white/5 border border-white/10 text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                <RepoField label="Frontend Repo" value={p.frontendRepo} />
                <RepoField label="Backend Repo" value={p.backendRepo} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={p.github || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 inline-flex items-center px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition text-sm"
                >
                  GitHub
                </a>
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 inline-flex items-center px-3 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold text-sm shadow-[0_18px_40px_rgba(124,58,237,0.2)]"
                >
                  Live URL
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function RepoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-linear-to-r from-indigo-950/35 to-violet-950/35 p-3">
      <div className="text-[11px] text-white/60 uppercase tracking-[0.18em] mb-2">{label}</div>
      <div className="h-10 rounded-xl border border-white/10 bg-[#070d1f] px-3 flex items-center text-white/70 text-sm truncate">
        {value}
      </div>
    </div>
  )
}

