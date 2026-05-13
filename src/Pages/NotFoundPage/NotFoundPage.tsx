export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center space-y-3">
        <div className="text-white text-3xl font-semibold">404</div>
        <div className="text-white/60">Page not found.</div>
        <a
          href="/"
          className="inline-flex h-10 items-center px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  )
}
