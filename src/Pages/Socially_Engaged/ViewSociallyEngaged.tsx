import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { FiEdit2, FiTrash2, FiExternalLink } from "react-icons/fi";

export default function ViewSociallyEngaged() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching social links");
      console.error(error);
    } else {
      setLinks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (id: number, iconUrl: string) => {
    if (!window.confirm("Are you sure you want to delete this social link?")) return;

    try {
      // 1. Delete from storage if icon exists
      if (iconUrl) {
        const filePath = iconUrl.split("/").pop();
        if (filePath) {
          await supabase.storage.from("portfolio-images").remove([`icons/${filePath}`]);
        }
      }

      // 2. Delete from database
      const { error } = await supabase
        .from("social_links")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Social link deleted successfully");
      fetchLinks();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "deactive" : "active";
    const { error } = await supabase
      .from("social_links")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast.error("Error updating status");
    } else {
      toast.success(`Status updated to ${newStatus}`);
      fetchLinks();
    }
  };

  return (
    <div className="max-w-6xl space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">Socially Engaged</div>
          <div className="text-white/55 mt-1">Manage your footer social links and icons.</div>
        </div>
        <Link
          to="/socially-engaged/add"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-600 transition shadow-[0_10px_20px_rgba(234,179,8,0.2)]"
        >
          Add New Link
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="text-white/40 text-sm mt-4 font-medium animate-pulse">Loading social links...</div>
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-white/30 text-lg">No social links found.</div>
            <Link to="/socially-engaged/add" className="text-indigo-400 hover:text-indigo-300 mt-2 inline-block">Add your first social link</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/2">
                  <th className="px-6 py-4 text-sm font-semibold text-white/70">Icon</th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/70">Platform</th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/70">URL</th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/70">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {links.map((link) => (
                  <tr key={link.id} className="hover:bg-white/2 transition group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 p-2 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                        {link.icon_url ? (
                          <img src={link.icon_url} alt={link.platform_name} className="h-full w-full object-contain" />
                        ) : (
                          <span className="text-xs text-white/30">{link.platform_name.slice(0, 2)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-medium">{link.platform_name}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white/50 hover:text-indigo-400 flex items-center gap-2 text-sm transition"
                      >
                        {link.url} <FiExternalLink size={12} />
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleStatus(link.id, link.status)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${
                          link.status === "active" 
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                            : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                        }`}
                      >
                        {link.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/socially-engaged/add/${link.id}`}
                          className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(link.id, link.icon_url)}
                          className="p-2 rounded-lg bg-white/5 text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10 transition"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        <div className="text-white font-semibold mb-4">Live Preview (Footer Style)</div>
        <div className="flex flex-wrap gap-5">
          {links.filter(l => l.status === "active").map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-16 w-16 rounded-2xl border border-white/10 bg-white/2 shadow-[0_14px_30px_rgba(0,0,0,0.35)] grid place-items-center hover:bg-white/5 hover:-translate-y-1 transition"
              title={link.platform_name}
            >
              <div className="h-10 w-10 p-1 flex items-center justify-center grayscale group-hover:grayscale-0 transition duration-500">
                <img src={link.icon_url} alt={link.platform_name} className="h-full w-full object-contain" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
