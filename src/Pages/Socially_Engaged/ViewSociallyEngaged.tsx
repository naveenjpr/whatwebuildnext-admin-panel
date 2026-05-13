export default function ViewSociallyEngaged() {
  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">Socially Engaged</div>
          <div className="text-white/55 mt-1">Preview how the social tiles will look.</div>
        </div>
        <a
          href="/socially-engaged/add"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]"
        >
          Add / Edit
        </a>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        <div className="text-white font-semibold">Footer Tiles (Preview)</div>
        <div className="text-white/55 text-sm mt-1">
          Same layout as your screenshot: icon tiles in a row with glass border.
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <Tile name="Twitter" handle="@whatwebuildnext" />
          <Tile name="GitHub" handle="github.com/..." />
          <Tile name="LinkedIn" handle="linkedin.com/..." />
          <Tile name="YouTube" handle="youtube.com/..." />
          <Tile name="Instagram" handle="@whatwebuildnext" />
        </div>
      </div>
    </div>
  )
}

function Tile({ name, handle }: { name: string; handle: string }) {
  return (
    <a
      href="#"
      className="group h-14 w-14 rounded-2xl border border-white/10 bg-white/2 shadow-[0_14px_30px_rgba(0,0,0,0.35)] grid place-items-center hover:bg-white/5 transition"
      title={`${name} • ${handle}`}
    >
      <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/85 text-xs font-mono group-hover:text-white transition">
        {name.slice(0, 2).toUpperCase()}
      </div>
    </a>
  )
}
