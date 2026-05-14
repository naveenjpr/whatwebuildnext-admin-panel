import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router";

export default function Addskills() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skillCategory, setSkillCategory] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [formData, setFormData] = useState({
    skill_name: "",
    category_id: "",
    status: "true",
  })

  useEffect(() => {
    const fetchCategories = async () => {
      setDataLoading(true)
      const { data, error } = await supabase.from("categories").select("*")
      if (error) {
        toast.error(error.message)
      } else {
        setSkillCategory(data)
      }
      if (!id) setDataLoading(false)
    }
    fetchCategories()
  }, [id])

  useEffect(() => {
    const getSkill = async () => {
      if (!id) return;
      setDataLoading(true)
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        toast.error("Error fetching skill data");
      } else if (data) {
        setFormData({
          skill_name: data.skill_name,
          category_id: data.category_id.toString(),
          status: data.status.toString(),
        });
      }
      setDataLoading(false)
    }
    getSkill()
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const obj = {
      skill_name: e.target.skill_name.value,
      category_id: parseInt(e.target.category_id.value),
      status: e.target.status.value === "true",
    }

    if (id) {
      const { error } = await supabase
        .from("skills")
        .update(obj)
        .eq("id", id);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Skill updated successfully");
        navigate("/skills/view");
      }
    } else {
      const { error } = await supabase
        .from("skills")
        .insert(obj);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Skill added successfully");
        navigate("/skills/view");
      }
    }
    setLoading(false);
  }

  return (
    <div className="max-w-full space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">
            {id ? "Edit Skill" : "Add Skill"}
          </div>
          <div className="text-white/55 mt-1">
            {id ? "Update the technology details." : "Add a technology to the website tech stack section."}
          </div>
        </div>
        <Link
          to="/skills/view"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          View Skills
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        {dataLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white/3 rounded-2xl border border-white/10 backdrop-blur">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="text-white/40 text-sm mt-4 font-medium animate-pulse">Fetching details...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)] space-y-4 w-full">
            <label className="block space-y-2">
              <div className="text-sm text-white/70">Skill Name</div>
              <input
                name="skill_name"
                value={formData.skill_name}
                onChange={(e) => setFormData({ ...formData, skill_name: e.target.value })}
                placeholder="e.g. React Native"
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
                required
              />
            </label>

            <label className="block space-y-2">
              <div className="text-sm text-white/70">Category</div>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25"
                required
              >
                <option value="" disabled className="bg-[#0b1220]">Select Category</option>
                {skillCategory?.map((c: any) => (
                  <option key={c.id} value={c.id} className="bg-[#0b1220]">
                    {c.cat_name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <div className="text-sm text-white/70">Status</div>
              <select
                name="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25"
              >
                <option value="true" className="bg-[#0b1220]">Active</option>
                <option value="false" className="bg-[#0b1220]">Inactive</option>
              </select>
            </label>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => navigate("/skills/view")}
                className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)] disabled:opacity-50"
              >
                {loading ? "Saving..." : (id ? "Update Skill" : "Publish")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
