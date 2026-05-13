export default function AddPortfolio() {
  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">Add Portfolio</div>
          <div className="text-white/55 mt-1">Create project entry in your website JSON format.</div>
        </div>
        <a
          href="/portfolio/view"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          View Projects
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Project ID" placeholder="1" />
            <Field label="Title" placeholder="DroneTv" />
            <SelectField
              label="Status"
              options={["active", "deactive"]}
            />
            <SelectField
              label="Feature Status"
              options={["true", "false"]}
            />
            <TextArea
              label="Category (Description Text)"
              placeholder="Developed a full-featured web platform..."
              className="md:col-span-2"
            />
            <Field label="Image Path / URL" placeholder="/images/dronetv.png" className="md:col-span-2" />
            <Field
              label="Tags (comma separated)"
              placeholder="React, Typescript, OpenAI, Tailwind CSS, AWS"
              className="md:col-span-2"
            />
            <Field label="Frontend Repo URL" placeholder="https://github.com/user/project-ui" className="md:col-span-2" />
            <Field label="Backend Repo URL" placeholder="https://github.com/user/project-api" className="md:col-span-2" />
            <Field label="GitHub URL" placeholder="https://github.com/..." className="md:col-span-2" />
            <Field label="Live URL" placeholder="https://www.dronetv.in" className="md:col-span-2" />
          </div>

          <div className="mt-5 flex gap-2">
            <button className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition">
              Save draft
            </button>
            <button className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]">
              Publish
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <div className="text-white font-semibold">JSON Preview Format</div>
          <div className="text-white/55 text-sm mt-1">Expected project object structure.</div>
          <pre className="mt-4 rounded-xl bg-[#0b1020] border border-white/10 p-4 text-xs text-white/80 overflow-auto">
{`{
  id: "1",
  title: "DroneTv",
  category: "Project description text...",
  image: "./images/dronetv.png",
  tags: ["React", "Typescript", "OpenAI", "Tailwind CSS", "AWS"],
  github: "https://github.com/...",
  liveUrl: "https://www.dronetv.in",
  frontendRepo: "https://github.com/user/project-ui",
  backendRepo: "https://github.com/user/project-api",
  status: "active",
  featureStatus: true
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  placeholder,
  className = "",
}: {
  label: string
  placeholder: string
  className?: string
}) {
  return (
    <label className={["block space-y-2", className].join(" ")}>
      <div className="text-sm text-white/70">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
      />
    </label>
  )
}

function TextArea({
  label,
  placeholder,
  className = "",
}: {
  label: string
  placeholder: string
  className?: string
}) {
  return (
    <label className={["block space-y-2", className].join(" ")}>
      <div className="text-sm text-white/70">{label}</div>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25 resize-none"
      />
    </label>
  )
}

function SelectField({
  label,
  options,
  className = "",
}: {
  label: string
  options: string[]
  className?: string
}) {
  return (
    <label className={["block space-y-2", className].join(" ")}>
      <div className="text-sm text-white/70">{label}</div>
      <select className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25">
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0b1220]">
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

