export default function SimplePage({ title }: { title: string }) {
  return (
    <div className="space-y-3">
      <div className="text-white text-2xl font-semibold tracking-tight">{title}</div>
      <div className="text-white/55">This section UI is ready. Next we’ll connect real API + forms.</div>
      <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        <div className="text-white/70 font-mono text-sm">
          {`// ${title.toLowerCase()} module coming next`}
        </div>
      </div>
    </div>
  )
}

