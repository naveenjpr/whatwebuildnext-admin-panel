import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase"
import { Link } from "react-router"
import { FiBox, FiUsers, FiLink, FiArrowUpRight, FiClock } from "react-icons/fi"

export default function Home() {
  const [stats, setStats] = useState({
    projects: 0,
    experts: 0,
    socials: 0,
    uptime: "99.9%"
  })
  const [recentProjects, setRecentProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        // Fetch Counts
        const [projectsCount, teamCount, socialsCount, recentData] = await Promise.all([
          supabase.from("portfolio").select("*", { count: "exact", head: true }),
          supabase.from("team").select("*", { count: "exact", head: true }),
          supabase.from("social_links").select("*", { count: "exact", head: true }),
          supabase.from("portfolio").select("*").order("id", { ascending: false }).limit(3)
        ])

        setStats({
          projects: projectsCount.count || 0,
          experts: teamCount.count || 0,
          socials: socialsCount.count || 0,
          uptime: "99.9%"
        })
        setRecentProjects(recentData.data || [])
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <h1 className="text-white! text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-white/55 mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/settings"
            className="h-11 px-6 flex items-center rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition font-medium"
          >
            Settings
          </Link>
          <Link
            to="/portfolio/add"
            className="h-11 px-6 flex items-center rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-bold shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all"
          >
            Launch Project
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FiBox className="text-blue-400" />}
          label="Total Projects"
          value={loading ? "..." : stats.projects}
          hint="Shipped builds"
        />
        <StatCard
          icon={<FiUsers className="text-purple-400" />}
          label="Team Experts"
          value={loading ? "..." : stats.experts}
          hint="Core engineers"
        />
        <StatCard
          icon={<FiLink className="text-emerald-400" />}
          label="Social Channels"
          value={loading ? "..." : stats.socials}
          hint="Active channels"
        />
        <StatCard
          icon={<FiArrowUpRight className="text-orange-400" />}
          label="System Uptime"
          value={stats.uptime}
          hint="Operational"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects List */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/3 backdrop-blur p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <FiClock size={20} />
              </div>
              <h3 className="text-white font-bold text-xl">Recent Projects</h3>
            </div>
            <Link to="/portfolio" className="text-blue-500 text-sm font-semibold hover:underline">View All</Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="py-12 flex justify-center"><div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin"></div></div>
            ) : recentProjects.length === 0 ? (
              <div className="py-12 text-center text-white/30 text-sm">No projects found. Launch your first one!</div>
            ) : (
              recentProjects.map((project) => (
                <div key={project.id} className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/8 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                      <img src={project.image_url} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <div className="text-white font-bold">{project.title}</div>
                      <div className="text-white/40 text-xs mt-0.5">{project.status === 'active' ? '● Live' : '○ Draft'}</div>
                    </div>
                  </div>
                  <Link to={`/portfolio/add/${project.id}`} className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition">
                    <FiArrowUpRight size={20} />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Tips / System Status */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-br from-indigo-600/10 to-purple-600/10 backdrop-blur p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Quick Tip</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Regularly update your portfolio to keep clients engaged. Featured projects are 2x more likely to convert!
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="text-white/30 text-[10px] uppercase tracking-widest font-bold mb-3">Server Health</div>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[99%] h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              </div>
              <span className="text-emerald-500 text-xs font-bold">Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string | number; hint: string }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur hover:bg-white/5 transition-all shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg border border-white/5 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{hint}</div>
      </div>
      <div className="text-white text-3xl font-black tracking-tight mb-1">{value}</div>
      <div className="text-white/40 text-sm font-medium">{label}</div>
    </div>
  )
}
