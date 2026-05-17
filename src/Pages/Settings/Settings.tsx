import { useState, useEffect } from "react"
import { FiUser, FiLock, FiMail, FiMapPin, FiPhone, FiSave, FiEye, FiEyeOff, FiShield } from "react-icons/fi"
import { supabase } from "../../../utils/supabase"
import { toast } from "react-toastify"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    location: "",
    email: "",
    phone: "",
    uptime: "",
    awards: ""
  })

  // Security Tab States
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [securityData, setSecurityData] = useState({ current: "", new: "", confirm: "" });
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    fetchContactDetails()
  }, [])

  const fetchContactDetails = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("contact_details")
        .select("*")
        .maybeSingle()

      if (error) throw error

      if (data) {
        setFormData({
          location: data.location || "",
          email: data.email || "",
          phone: data.phone || "",
          uptime: data.uptime || "",
          awards: data.awards || ""
        })
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { error } = await supabase
        .from("contact_details")
        .upsert({
          id: 1, // Using a fixed ID for single row settings
          location: formData.location,
          email: formData.email,
          phone: formData.phone,
          uptime: formData.uptime,
          awards: formData.awards,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      toast.success("Profile information updated successfully!")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdatePassword = async () => {
    // 1. Basic Validations
    if (!securityData.current || !securityData.new || !securityData.confirm) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (securityData.new.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    if (securityData.new !== securityData.confirm) {
      toast.error("New passwords do not match!");
      return;
    }

    setPasswordSaving(true);
    try {
      // 2. Get current user email
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.email) throw new Error("Failed to identify current user. Please log in again.");

      // 3. Verify current password by signing in again
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: securityData.current,
      });

      if (signInError) {
        throw new Error("Current password is incorrect. Please try again.");
      }

      // 4. Update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: securityData.new
      });

      if (updateError) throw updateError;

      toast.success("Password updated successfully!");
      setSecurityData({ current: "", new: "", confirm: "" }); // Reset form
      setShowPasswords({ current: false, new: false, confirm: false }); // Hide passwords
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-white! text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-white/55">Manage your account settings and contact information.</p>
      </div>

      {/* Tabs UI */}
      <div className="flex gap-8 border-b border-white/10">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 pb-4 text-sm font-semibold transition-all relative ${activeTab === "profile" ? "text-blue-500" : "text-white/40 hover:text-white/60"
            }`}
        >
          <FiUser size={18} />
          Profile Information
          {activeTab === "profile" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 pb-4 text-sm font-semibold transition-all relative ${activeTab === "security" ? "text-blue-500" : "text-white/40 hover:text-white/60"
            }`}
        >
          <FiLock size={18} />
          Security
          {activeTab === "security" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "profile" ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                <h3 className="text-white font-semibold">Contact Details</h3>
              </div>

              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                  <div className="text-white/30 text-sm font-medium animate-pulse">Loading details...</div>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Location</label>
                      <div className="relative group">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/10 transition outline-none"
                          placeholder="e.g. India"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative group">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/10 transition outline-none"
                          placeholder="whatwebuildnext@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative group">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/10 transition outline-none"
                          placeholder="+91 8805388474"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Client Uptime (%)</label>
                      <div className="relative group">
                        <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          value={formData.uptime}
                          onChange={(e) => setFormData({ ...formData, uptime: e.target.value })}
                          className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/10 transition outline-none"
                          placeholder="99.9%"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Awards Count</label>
                      <div className="relative group">
                        <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          value={formData.awards}
                          onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                          className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/10 transition outline-none"
                          placeholder="5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-start">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 px-10 h-12 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-600/20 active:scale-95"
                    >
                      {saving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <><FiSave /> Save Changes</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Info Alert */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-200/80 text-sm">
              <FiShield className="text-orange-400 shrink-0" size={18} />
              Update your password regularly to keep your account secure.
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-8 backdrop-blur shadow-2xl space-y-8">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Current Password</label>
                <div className="relative group max-w-2xl">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={securityData.current}
                    onChange={(e) => setSecurityData({ ...securityData, current: e.target.value })}
                    className="w-full h-12 pl-11 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/10 transition outline-none"
                    placeholder="Type current password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                  >
                    {showPasswords.current ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">New Password</label>
                  <div className="relative group">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={securityData.new}
                      onChange={(e) => setSecurityData({ ...securityData, new: e.target.value })}
                      className="w-full h-12 pl-11 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/10 transition outline-none"
                      placeholder="New password"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPasswords.new ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Confirm Password</label>
                  <div className="relative group">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={securityData.confirm}
                      onChange={(e) => setSecurityData({ ...securityData, confirm: e.target.value })}
                      className="w-full h-12 pl-11 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/10 transition outline-none"
                      placeholder="Confirm new password"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPasswords.confirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  disabled={passwordSaving}
                  className="px-8 h-12 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition disabled:opacity-50 shadow-xl shadow-blue-600/20 active:scale-95 cursor-pointer"
                >
                  {passwordSaving ? (
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                       Updating...
                    </div>
                  ) : "Save New Password"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
