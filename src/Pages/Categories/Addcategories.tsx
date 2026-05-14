import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Loading from "../../../loading";

export default function Addcategories() {
  let params = useParams()
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    cat_name: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      const getcategory = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("categories").select("*").eq("id", params.id).single();
        if (error) {
          console.log(error);
        } else {
          setFormData({
            cat_name: data.cat_name,
            status: data.status,
          });
        }
        setLoading(false);
      }
      getcategory();
    }
  }, [params.id]);



  const handlesubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    let obj = {
      cat_name: e.target.cat_name.value,
      status: e.target.status.value,
    }

    if (params.id) {

      const { error } = await supabase
        .from("categories")
        .update(obj)
        .eq("id", params.id)
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Category updated successfully");
        navigate("/categories/view");
      }

    }

    else {
      const { error } = await supabase
        .from("categories")
        .insert(obj)
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Category added successfully");
        navigate("/categories/view");
      }
    }
    setLoading(false);
  }

  if (loading) return <Loading />;
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">Add Category</div>
          <div className="text-white/55 mt-1">Create a new category for the list section.</div>
        </div>
        <a
          href="/categories/view"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          View Categories
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <form onSubmit={handlesubmit} className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)] space-y-4">
          <label className="block space-y-2">
            <div className="text-sm text-white/70">Category Name</div>
            <input
              value={formData.cat_name}
              name="cat_name"
              onChange={(e) => setFormData({ ...formData, cat_name: e.target.value })}
              placeholder="AI & Automation"
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
            />
          </label>

          {/* <div className="text-sm">
            {exists ? (
              <span className="text-amber-300">This category already exists.</span>
            ) : (
              <span className="text-emerald-300">This is a new category.</span>
            )}
          </div> */}
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

          <div className="flex gap-2">
            <button type="submit" className="h-10 cursor-pointer px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]">
              Publish
            </button>
          </div>
        </form>


      </div>
    </div>
  )
}
