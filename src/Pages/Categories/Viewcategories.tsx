import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Loading from "../../../loading";

type CategoryItem = {
  id: string
  cat_name: string
  status: boolean
}



export default function Viewcategories() {
  const [rows, setRows] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState(true)

  let viewcategory = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("categories").select("*").order("id", { ascending: true });
    if (error) {
      console.log(error);
    } else {
      setRows(data);
    }
    setLoading(false)
  }

  const onDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Deleted Successfully");
        viewcategory()
      }
    }
  };

  const onToggle = async (id: string, status: boolean) => {
    const { error } = await supabase
      .from("categories")
      .update({ status: !status })
      .eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Status Updated Successfully");
      viewcategory()
    }
  }
  useEffect(() => {

    viewcategory()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="max-w-full space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">Categories</div>
          <div className="text-white/55 mt-1">Manage category list used in the website section.</div>
        </div>
        <a
          href="/categories/add"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]"
        >
          Add Category
        </a>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/3 p-4 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        <div className="space-y-2">
          {rows.length > 0 ? rows.map((row, index) => (
            <div
              key={index}
              className="rounded-xl bg-[#08122b] border border-white/10 px-4 py-3 flex items-center justify-between gap-3"
            >
              <span className="text-white text-[34px] leading-none"><span> {index + 1}</span> {row.cat_name}</span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggle(row.id, row.status)}
                  className={[
                    "h-7 px-2 rounded-md text-[10px] border font-mono cursor-pointer",
                    row.status
                      ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-200 border-rose-500/20",
                  ].join(" ")}
                >
                  {row.status ? "true" : "false"}
                </button>
                <Link to={`/categories/add/${row.id}`} className="h-7 px-2 cursor-pointer rounded-md text-[10px] bg-white/5 border border-white/10 text-white/80">
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => onDelete(row.id)}
                  className="h-7 cursor-pointer px-2 rounded-md text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-200"
                >
                  Delete
                </button>
              </div>
            </div>
          )) : <div className="text-white">No categories found</div>}
        </div>
      </div>


    </div>
  )
}
