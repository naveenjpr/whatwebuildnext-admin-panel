export default function Profile() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-white text-2xl font-semibold tracking-tight">Your profile</h1>
        <p className="text-white/55 mt-1">Manage your admin account details.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/140?img=12"
            alt="Profile"
            className="h-20 w-20 rounded-full border border-white/15 object-cover"
          />
          <div>
            <div className="text-white font-semibold text-lg">Admin User</div>
            <div className="text-white/55">admin@whatwebuildnext.com</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Field label="Full Name" value="Admin User" />
          <Field label="Role" value="Super Admin" />
          <Field label="Email" value="admin@whatwebuildnext.com" />
          <Field label="Phone" value="+91 98765 43210" />
        </div>

        <div className="mt-5 flex gap-2">
          <button className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition">
            Cancel
          </button>
          <button className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold">
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-white/70">{label}</span>
      <input
        defaultValue={value}
        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25"
      />
    </label>
  )
}
