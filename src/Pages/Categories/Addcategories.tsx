import { useState } from "react"

const CATEGORY_JSON = ["Frontend", "Backend", "Databases", "DevOps & Cloud", "Tools & Platforms", "CMS & Others"]

export default function Addcategories() {
  const [name, setName] = useState("")
  const exists = CATEGORY_JSON.some((c) => c.toLowerCase() === name.trim().toLowerCase())

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
        <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)] space-y-4">
          <label className="block space-y-2">
            <div className="text-sm text-white/70">Category Name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="AI & Automation"
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
            />
          </label>

          <div className="text-sm">
            {exists ? (
              <span className="text-amber-300">This category already exists.</span>
            ) : (
              <span className="text-emerald-300">This is a new category.</span>
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
          <div className="text-white/55 text-sm mt-1">Same list style as shown in the screenshot.</div>

          <div className="mt-4 rounded-xl bg-[#08122b] border border-white/10 px-4 py-3">
            <span className="text-white text-[34px] leading-none">{name.trim() || "New Category"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
