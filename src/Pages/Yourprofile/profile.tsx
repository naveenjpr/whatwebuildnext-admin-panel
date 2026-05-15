import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase"
import { FiMail, FiPhone, FiUser, FiShield } from "react-icons/fi"
import { Link } from "react-router"

export default function Profile() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="text-white/40 text-sm font-medium animate-pulse">Loading profile...</div>
      </div>
    )
  }

  const fullName = user?.user_metadata?.full_name || "Admin User"
  const email = user?.email || "No email found"
  const phone = user?.phone || "Not provided"

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-white text-2xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-white/55">Manage your admin account details and identity.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/3 p-8 backdrop-blur shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${fullName}&background=2563eb&color=fff&size=128`}
              alt="Profile"
              className="h-24 w-24 rounded-2xl border-2 border-white/15 object-cover shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-blue-600 rounded-lg border-2 border-[#0b1120] flex items-center justify-center text-white">
               <FiShield size={14} />
            </div>
          </div>
          <div>
            <h2 className="text-white font-bold text-2xl tracking-tight">{fullName}</h2>
            <div className="text-blue-400 font-medium text-sm flex items-center gap-2 mt-1">
               <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
               System Administrator
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <ProfileField icon={<FiUser />} label="Full Name" value={fullName} />
          <ProfileField icon={<FiShield />} label="Role" value="Super Admin" />
          <ProfileField icon={<FiMail />} label="Email Address" value={email} />
          <ProfileField icon={<FiPhone />} label="Phone Number" value={phone} />
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
          <button className="h-11 px-6 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer">
            Edit Profile
          </button>
          <Link 
            to="/settings"
            className="h-11 px-6 flex items-center rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition font-medium"
          >
            Account Settings
          </Link>
        </div>
      </div>
    </div>
  )
}

function ProfileField({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">{label}</label>
      <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 group hover:border-white/20 transition-all">
        <span className="text-blue-500/60 group-hover:text-blue-500 transition-colors">{icon}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
    </div>
  )
}
