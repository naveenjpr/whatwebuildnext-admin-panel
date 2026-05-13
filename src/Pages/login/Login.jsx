import { Link } from "react-router-dom"

export default function Login() {
  return (
    <div className="min-h-svh grid place-items-center bg-[#050b18] p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
        <h1 className="text-white text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-white/55 mt-1">Welcome back to WWBN admin panel.</p>

        <div className="mt-5 space-y-4">
          <Field label="Email" type="email" placeholder="admin@whatwebuildnext.com" />
          <Field label="Password" type="password" placeholder="••••••••" />
        </div>

        <button className="mt-5 w-full h-11 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold">
          Sign in
        </button>

        <div className="mt-4 text-sm text-white/60">
          Back to{" "}
          <Link to="/" className="text-indigo-300 hover:text-indigo-200">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

function Field({ label, type, placeholder }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-white/70">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
      />
    </label>
  )
}