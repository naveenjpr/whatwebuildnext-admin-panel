import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase"
import { toast } from "react-toastify"
import { Link } from "react-router"

type Project = {
  id: number
  title: string
  description: string
  image_url: string
  tags: string[]
  frontend_repo: string
  backend_repo: string
  github_url: string
  live_url: string
  status: "active" | "deactive"
  is_featured: boolean
  member_id: number
  team?: {
    name: string
  }
}

export default function ViewPortfolio() {
  const [rows, setRows] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("portfolio")
      .select(`
        *,
        team (
          name
        )
      `)
      .order("id", { ascending: false })

    if (error) {
      toast.error("Failed to fetch projects")
      console.error(error)
    } else {
      setRows(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  async function toggleStatus(id: number, currentStatus: string) {
    const newStatus = currentStatus === "active" ? "deactive" : "active"
    const { error } = await supabase
      .from("portfolio")
      .update({ status: newStatus })
      .eq("id", id)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Status updated")
      setRows((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus as any } : p))
      )
    }
  }

  async function toggleFeatureStatus(id: number, currentFeatured: boolean) {
    const { error } = await supabase
      .from("portfolio")
      .update({ is_featured: !currentFeatured })
      .eq("id", id)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Feature status updated")
      setRows((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_featured: !currentFeatured } : p))
      )
    }
  }

  const deleteProject = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return

    try {
      // 1. Delete image from storage
      if (project.image_url && project.image_url.includes("portfolio-images")) {
        const parts = project.image_url.split("portfolio-images/")
        if (parts.length > 1) {
          const filePath = parts[1]
          await supabase.storage.from("portfolio-images").remove([filePath])
        }
      }

      // 2. Delete from database
      const { error } = await supabase.from("portfolio").delete().eq("id", project.id)

      if (error) throw error

      toast.success("Project deleted successfully")
      setRows((prev) => prev.filter((p) => p.id !== project.id))
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">View Portfolio</div>
          <div className="text-white/55 mt-1">Manage your website projects and case studies.</div>
        </div>
        <Link
          to="/portfolio/add"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)] hover:scale-[1.02] transition-all"
        >
          Add New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="text-white/40 text-sm font-medium animate-pulse">Loading projects...</div>
        </div>
      ) : rows.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-white/10 rounded-[32px] bg-white/2">
          <div className="text-white/50 text-lg font-medium">No projects found</div>
          <p className="text-white/30 text-sm mt-2 font-light">
            Your portfolio is empty. Click "Add New Project" to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {rows.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col"
            >
              <span>


                {p.team?.name && (
                  <div className="mt-1 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                    <span className="text-[11px] text-indigo-300 font-medium tracking-wide uppercase">
                      Expert: {p.team.name}
                    </span>
                  </div>
                )}
              </span>
              <img
                src={p.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"}
                alt={p.title}
                className="w-full h-52 object-cover bg-[#0b1020]"
                onError={(e) => {
                  ; (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
                }}
              />
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-white text-lg font-semibold truncate">{p.title}</h3>

                  </div>
                  <span className="text-xs text-white/50 font-mono shrink-0 pt-1">ID: {p.id}</span>
                </div>
                <p className="text-white/65 text-sm leading-relaxed mt-2 line-clamp-2">
                  {p.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags &&
                    p.tags.map((tag) => (
                      <span
                        key={`${p.id}-${tag}`}
                        className="inline-flex items-center h-7 px-3 rounded-full text-xs bg-white/5 border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RepoField label="Frontend Repo" value={p.frontend_repo || "N/A"} />
                  <RepoField label="Backend Repo" value={p.backend_repo || "N/A"} />
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 flex flex-col gap-5">
                  {/* Status Indicators & Toggles */}


                  {/* Links & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2">
                      <a
                        href={p.github_url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="h-9 inline-flex items-center px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition text-sm"
                      >
                        GitHub
                      </a>
                      <a
                        href={p.live_url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="h-9 inline-flex items-center px-3 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold text-sm shadow-[0_18px_40px_rgba(124,58,237,0.2)]"
                      >
                        Live URL
                      </a>
                    </div>


                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "inline-flex items-center h-8 px-3 rounded-lg text-xs border font-mono",
                          p.status === "active"
                            ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-200 border-rose-500/20",
                        ].join(" ")}
                      >
                        {p.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleStatus(p.id, p.status)}
                        className="h-8 px-3 rounded-lg text-[10px] bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition cursor-pointer"
                      >
                        Change
                      </button>
                    </div>

                    <div className="w-px h-4 bg-white/10 mx-1 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "inline-flex items-center h-8 px-3 rounded-lg text-xs border font-mono",
                          p.is_featured
                            ? "bg-green-500/15 text-indigo-200 border-indigo-500/25"
                            : "bg-red-500/15 text-slate-200 border-slate-500/25",
                        ].join(" ")}
                      >
                        {p.is_featured ? "Active" : "De active"}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFeatureStatus(p.id, p.is_featured)}
                        className="h-8 px-3 rounded-lg text-[10px] bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition cursor-pointer"
                      >
                        Toggle
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/portfolio/add/${p.id}`}
                        className="h-9 px-4 inline-flex items-center rounded-xl bg-white/5 border border-white/10 text-indigo-300 hover:text-indigo-200 hover:bg-white/10 transition text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteProject(p)}
                        className="h-9 px-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 transition text-sm cursor-pointer font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
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
