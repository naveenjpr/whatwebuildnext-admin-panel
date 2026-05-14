import { useEffect, useState, useMemo } from "react"
import { supabase } from "../../../utils/supabase";
import { toast } from "react-toastify";
import { Link } from "react-router";

type TeamMember = {
  id: number
  name: string
  role: string
  image: string
  github: string
  linkedin: string
  live_demo: string
  status: boolean
  skills: { skill: { skill_name: string } }[]
}

export default function ViewMeettheExperts() {
  const [experts, setExperts] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  const fetchExperts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('team')
      .select(`
        *,
        skills:team_member_skills (
          skill:skills (
            skill_name
          )
        )
      `)
      .order('id', { ascending: true });

    if (error) {
      toast.error("Failed to fetch experts");
      console.error(error);
    } else {
      setExperts(data || []);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchExperts()
  }, [])

  const activeCount = useMemo(() => experts.filter((e) => e.status).length, [experts])

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from("team")
      .update({ status: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Status updated");
      fetchExperts();
    }
  }

  const removeExpert = async (expert: TeamMember) => {
    if (!confirm(`Are you sure you want to delete ${expert.name}?`)) return;

    try {
      // 1. Delete image from storage if it exists
      if (expert.image && expert.image.includes("team-images")) {
        // Extract file path from public URL
        // URL format: .../storage/v1/object/public/team-images/experts/filename.jpg
        const parts = expert.image.split("team-images/");
        if (parts.length > 1) {
          const filePath = parts[1];
          const { error: storageError } = await supabase.storage
            .from("team-images")
            .remove([filePath]);
          
          if (storageError) console.error("Storage delete error:", storageError);
        }
      }

      // 2. Delete expert record from database
      const { error } = await supabase
        .from("team")
        .delete()
        .eq("id", expert.id);

      if (error) throw error;

      toast.success("Expert and their image removed permanently");
      fetchExperts();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="text-white text-2xl font-semibold tracking-tight">Team (Experts)</div>
          <div className="text-white/55 mt-1">Manage “Meet the Experts” section for the website.</div>
          <div className="text-white/45 text-sm mt-2">
            Active: <span className="text-white/80 font-mono">{activeCount}</span> /{" "}
            <span className="text-white/80 font-mono">{experts.length}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to="/team/add"
            className="h-10 inline-flex items-center px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]"
          >
            Add Expert
          </Link>
          <button
            onClick={fetchExperts}
            className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="text-white/40 text-sm font-medium animate-pulse">Loading team members...</div>
        </div>
      ) : experts.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-white/10 rounded-[32px] bg-white/2">
          <div className="text-white/50 text-lg">No experts found</div>
          <p className="text-white/30 text-sm mt-2">Click "Add Expert" to create your first team member.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {experts.map((m) => (
            <div
              key={m.id}
              className="rounded-[32px] border border-white/10 bg-white/3 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col"
            >
              <div className="p-6 flex items-start gap-4">
                <img
                  src={m.image || "/images/default_avatar.png"}
                  alt={m.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-white/10 bg-white/5"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/default_avatar.png" }}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-white font-bold truncate">{m.name}</div>
                  <div className="text-slate-400 text-sm truncate">{m.role}</div>

                </div>
              </div>

              <div className="px-6 pb-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-auto">
                  {m.skills?.map((s, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center h-7 px-3 rounded-full text-xs bg-white/5 border border-white/10 text-white/70"
                    >
                      {s.skill?.skill_name}
                    </span>
                  ))}
                  {(!m.skills || m.skills.length === 0) && (
                    <span className="text-white/20 text-xs italic">No skills added</span>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={m.github || "#"}
                      target="_blank"
                      className="h-9 inline-flex items-center px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition text-sm"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                    <a
                      href={m.linkedin || "#"}
                      target="_blank"
                      className="h-9 inline-flex items-center px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition text-sm"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={m.live_demo || "#"}
                      target="_blank"
                      className="h-9 inline-flex items-center px-3 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.18)] text-sm"
                      rel="noreferrer"
                    >
                      Live Demo
                    </a>
                  </div>

                  <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "inline-flex items-center h-8 px-3 rounded-xl border font-mono text-[10px]",
                          m.status
                            ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-200 border-rose-500/20",
                        ].join(" ")}
                      >
                        {m.status ? "Active" : "Inactive"}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleStatus(m.id, m.status)}
                        className="h-8 px-3 rounded-xl bg-white/5 border border-white/10 text-white/75 hover:text-white hover:bg-white/10 transition text-xs cursor-pointer"
                      >
                        Toggle
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/team/add/${m.id}`}
                        className="h-8 px-3 inline-flex items-center rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition text-xs"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeExpert(m)}
                        className="h-8 px-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 hover:bg-rose-500/15 transition text-xs cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
