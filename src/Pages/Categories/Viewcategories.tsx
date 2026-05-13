import { useState } from "react"

type CategoryItem = {
  id: string
  name: string
  isActive: boolean
}

const CATEGORIES: CategoryItem[] = [
  { id: "1", name: "Frontend", isActive: true },
  { id: "2", name: "Backend", isActive: true },
  { id: "3", name: "Databases", isActive: true },
  { id: "4", name: "DevOps & Cloud", isActive: true },
  { id: "5", name: "Tools & Platforms", isActive: true },
  { id: "6", name: "CMS & Others", isActive: true },
]

export default function Viewcategories() {
  const [rows, setRows] = useState<CategoryItem[]>(CATEGORIES)
  const [editing, setEditing] = useState<CategoryItem | null>(null)
  const [name, setName] = useState("")

  function onToggle(id: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)))
  }

  function onDelete(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  function onEditOpen(row: CategoryItem) {
    setEditing(row)
    setName(row.name)
  }

  function onEditSave() {
    if (!editing || !name.trim()) return
    setRows((prev) => prev.map((r) => (r.id === editing.id ? { ...r, name: name.trim() } : r)))
    setEditing(null)
  }

  return (
    <div className="max-w-3xl space-y-6">
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
          {rows.map((row) => (
            <div
              key={row.id}
              className="rounded-xl bg-[#08122b] border border-white/10 px-4 py-3 flex items-center justify-between gap-3"
            >
              <span className="text-white text-[34px] leading-none">{row.name}</span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggle(row.id)}
                  className={[
                    "h-7 px-2 rounded-md text-[10px] border font-mono",
                    row.isActive
                      ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-200 border-rose-500/20",
                  ].join(" ")}
                >
                  {row.isActive ? "true" : "false"}
                </button>
                <button
                  type="button"
                  onClick={() => onEditOpen(row)}
                  className="h-7 px-2 rounded-md text-[10px] bg-white/5 border border-white/10 text-white/80"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(row.id)}
                  className="h-7 px-2 rounded-md text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing ? (
        <div className="fixed inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-black/60" onClick={() => setEditing(null)} />
          <div className="relative mx-auto mt-28 w-[min(520px,92vw)] rounded-2xl border border-white/10 bg-[#0b1220] shadow-[0_18px_80px_rgba(0,0,0,0.7)] p-5 space-y-4">
            <div className="text-white font-semibold">Edit Category</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onEditSave}
                className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
