import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router";

export default function AddMeettheExperts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [availableSkills, setAvailableSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]) // Storing IDs now
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    github: "",
    linkedin: "",
    LiveDemo: "",
    status: "true"
  })

  const fetchAvailableSkills = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("id, skill_name")
      .eq("status", true)
      .order("skill_name", { ascending: true });
    
    if (error) {
      toast.error("Failed to fetch skills");
    } else {
      setAvailableSkills(data || []);
    }
  }

  useEffect(() => {
    fetchAvailableSkills();
  }, []);

  useEffect(() => {
    const getExpert = async () => {
      if (!id) return;
      setDataLoading(true);
      
      // Fetch expert details
      const { data, error } = await supabase
        .from("team")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        console.error(error);
        toast.error("Error fetching expert data");
      } else if (data) {
        setFormData({
          name: data.name,
          role: data.role,
          image: data.image,
          github: data.github,
          linkedin: data.linkedin,
          LiveDemo: data.live_demo,
          status: data.status.toString(),
        });

        // Fetch expert's skills from join table
        const { data: expertSkills, error: skillsError } = await supabase
          .from("team_member_skills")
          .select("skill_id")
          .eq("team_id", id);
        
        if (!skillsError && expertSkills) {
          setSelectedSkills(expertSkills.map(s => s.skill_id));
        }
      }
      setDataLoading(false);
    }
    getExpert();
  }, [id]);

  const toggleSkill = (skillId: number) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId) 
        : [...prev, skillId]
    );
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `experts/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('team-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('team-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      // 1. Upload image if new file selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const expertObj = {
        name: e.target.name.value,
        role: e.target.role.value,
        image: imageUrl,
        github: e.target.github.value,
        linkedin: e.target.linkedin.value,
        live_demo: e.target.live_demo.value,
        status: e.target.status.value === "true",
      }

      let teamId = id ? parseInt(id) : null;

      // 2. Insert or Update Expert
      if (id) {
        const { error } = await supabase
          .from("team")
          .update(expertObj)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("team")
          .insert(expertObj)
          .select()
          .single();
        if (error) throw error;
        teamId = data.id;
      }

      // 3. Handle Many-to-Many Skills Relationship
      // Delete old skills
      if (teamId) {
        await supabase.from("team_member_skills").delete().eq("team_id", teamId);
        
        // Insert new skills
        if (selectedSkills.length > 0) {
          const skillEntries = selectedSkills.map(skillId => ({
            team_id: teamId,
            skill_id: skillId
          }));
          const { error: skillError } = await supabase
            .from("team_member_skills")
            .insert(skillEntries);
          if (skillError) throw skillError;
        }
      }

      toast.success(id ? "Expert updated successfully" : "Expert added successfully");
      navigate("/team/view");

    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-full space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">
            {id ? "Edit Expert" : "Add Expert"}
          </div>
          <div className="text-white/55 mt-1">
            {id ? "Update expert details." : "Create a new team member card."}
          </div>
        </div>
        <Link
          to="/team/view"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          View Team
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {dataLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white/3 rounded-2xl border border-white/10 backdrop-blur">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="text-white/40 text-sm mt-4 font-medium animate-pulse">Fetching details...</div>
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
              <div className="text-white font-semibold">Details</div>
              <div className="text-white/55 text-sm mt-1">Fill fields and publish.</div>
              
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block space-y-2">
                    <div className="text-sm text-white/70">Name</div>
                    <input
                      name="name"
                      defaultValue={formData.name}
                      placeholder="Naveen Saini"
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
                      required
                    />
                  </label>
                  <label className="block space-y-2">
                    <div className="text-sm text-white/70">Role</div>
                    <input
                      name="role"
                      defaultValue={formData.role}
                      placeholder="Full Stack Developer"
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
                      required
                    />
                  </label>
                  
                  <label className="block space-y-2 md:col-span-2">
                    <div className="text-sm text-white/70">Profile Image</div>
                    <div className="flex gap-4 items-center">
                      {(imageFile || formData.image) && (
                        <img 
                          src={imageFile ? URL.createObjectURL(imageFile) : formData.image} 
                          className="w-12 h-12 rounded-xl object-cover border border-white/10 bg-white/5" 
                          alt="preview"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/default_avatar.png" }}
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-white/5 file:text-white hover:file:bg-white/10 cursor-pointer"
                      />
                    </div>
                  </label>

                  <div className="md:col-span-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white/70">Skills (Select Multiple)</div>
                      <button 
                        type="button" 
                        onClick={fetchAvailableSkills}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
                      >
                        Refresh List
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-white/5 border border-white/10 max-h-48 overflow-y-auto">
                      {availableSkills.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleSkill(s.id)}
                          className={[
                            "px-3 py-1.5 rounded-lg text-xs border transition-all cursor-pointer",
                            selectedSkills.includes(s.id)
                              ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-200"
                              : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                          ].join(" ")}
                        >
                          {s.skill_name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="block space-y-2">
                    <div className="text-sm text-white/70">GitHub</div>
                    <input
                      name="github"
                      defaultValue={formData.github}
                      placeholder="https://github.com/..."
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
                    />
                  </label>
                  <label className="block space-y-2">
                    <div className="text-sm text-white/70">LinkedIn</div>
                    <input
                      name="linkedin"
                      defaultValue={formData.linkedin}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
                    />
                  </label>
                  <label className="block space-y-2 md:col-span-2">
                    <div className="text-sm text-white/70">Live Demo</div>
                    <input
                      name="live_demo"
                      defaultValue={formData.LiveDemo}
                      placeholder="https://yourname.whatwebuildnext.com/"
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
                    />
                  </label>

                  <label className="block space-y-2 md:col-span-2">
                    <div className="text-sm text-white/70">Status</div>
                    <select
                      name="status"
                      defaultValue={formData.status}
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25"
                    >
                      <option value="true" className="bg-[#0b1220]">Active</option>
                      <option value="false" className="bg-[#0b1220]">Inactive</option>
                    </select>
                  </label>
                </div>

                <div className="mt-5 flex gap-2">
                  <button 
                    type="button"
                    onClick={() => navigate("/team/view")}
                    className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "Saving..." : (id ? "Update Expert" : "Publish")}
                  </button>
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.35)] h-fit">
              <div className="text-white font-semibold">Preview</div>
              <div className="text-white/55 text-sm mt-1">Card preview (updates on refresh or state change).</div>

              <div className="mt-5 rounded-[32px] border border-white/10 bg-white/3 overflow-hidden">
                <div className="p-6 flex items-start gap-4">
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : (formData.image || "/images/default_avatar.png")}
                    alt="Preview"
                    className="w-14 h-14 rounded-2xl object-cover border border-white/10 bg-white/5"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/default_avatar.png" }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-white font-bold truncate">{formData.name || "Name"}</div>
                    <div className="text-slate-400 text-sm truncate">{formData.role || "Role"}</div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.length > 0 ? (
                      selectedSkills.map(sid => {
                        const s = availableSkills.find(as => as.id === sid);
                        return s ? (
                          <span key={sid} className="inline-flex items-center h-7 px-3 rounded-full text-xs bg-white/5 border border-white/10 text-white/70">
                            {s.skill_name}
                          </span>
                        ) : null;
                      })
                    ) : (
                      <span className="text-white/20 text-xs italic">No skills selected</span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="h-9 inline-flex items-center px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm">
                      GitHub
                    </span>
                    <span className="h-9 inline-flex items-center px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm">
                      LinkedIn
                    </span>
                    <span className="h-9 inline-flex items-center px-3 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.18)] text-sm">
                      Live Demo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
