import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase";
import { toast } from "react-toastify";
import { Link } from "react-router";

type Skill = {
  id: number
  skill_name: string
  category_id: number
  status: boolean
  categories: {
    cat_name: string
  }
}

export default function Viewskills() {
  const [loading, setLoading] = useState(true)
  const [viewskills, setviewskills] = useState<Skill[]>([])

  async function toggleStatus(id: number, currentStatus: boolean) {
    const { error } = await supabase
      .from("skills")
      .update({ status: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Status updated");
      viewSkills();
    }
  }

  async function removeSkill(id: number) {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Skill deleted");
      viewSkills();
    }
  }

  const viewSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("skills")
      .select(`
        id,
        skill_name,
        category_id,
        status,
        categories (
          cat_name
        )
      `)
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      toast.error("Failed to fetch skills");
    } else {
      console.log(data, "skills");
      // Transform data to ensure categories is an object, not an array
      const formattedData = data?.map((item: any) => ({
        ...item,
        categories: Array.isArray(item.categories) ? item.categories[0] : item.categories
      }))
      setviewskills(formattedData as Skill[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    viewSkills()
  }, [])

  // Grouping logic without useMemo
  const groups: Record<string, Skill[]> = {};
  viewskills.forEach((skill) => {
    const catName = skill.categories?.cat_name || "Uncategorized";
    if (!groups[catName]) groups[catName] = [];
    groups[catName].push(skill);
  });
  const grouped = Object.entries(groups);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">Skills / Tech Stack</div>
          <div className="text-white/55 mt-1">Manage skills shown in the website stack section.</div>
        </div>
        <Link
          to="/skills/add"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]"
        >
          Add Skill
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="text-white/40 text-sm font-medium animate-pulse">Loading skills...</div>
        </div>
      ) : grouped.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <div className="text-white/50">No skills found in database.</div>
          <div className="text-white/30 text-sm mt-2">Check if you have run the SQL script in Supabase.</div>
        </div>
      ) : (
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

              <div className="flex flex-col justify-between gap-2 w-full">
                {list.map((skill: Skill, index: number) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 flex items-center justify-between gap-2"
                  >
                    <span className="text-white/85 text-sm">
                      {skill.skill_name}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleStatus(skill.id, skill.status)}
                        className={[
                          "h-6 px-2 rounded-md text-[10px] border font-mono cursor-pointer",
                          skill.status
                            ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/30"
                            : "bg-rose-500/10 text-rose-200 border-rose-500/30",
                        ].join(" ")}
                      >
                        {skill.status ? "true" : "false"}
                      </button>
                      <Link to={`/skills/add/${skill.id}`}>
                        <button
                          type="button"
                          className="h-6 cursor-pointer px-2 rounded-md text-[10px] bg-white/5 border border-white/10 text-white/75"
                        >
                          Edit
                        </button>
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeSkill(skill.id)}
                        className="h-6 cursor-pointer px-2 rounded-md text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
