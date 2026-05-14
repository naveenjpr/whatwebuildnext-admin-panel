import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router";

export default function AddPortfolio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [experts, setExperts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    status: "active",
    is_featured: "false",
    description: "",
    image_url: "",
    tags: "",
    frontend_repo: "",
    backend_repo: "",
    github_url: "",
    live_url: "",
    member_id: ""
  });

  // Fetch experts for the dropdown
  useEffect(() => {
    const fetchExperts = async () => {
      const { data } = await supabase.from("team").select("id, name");
      setExperts(data || []);
    };
    fetchExperts();
  }, []);

  // Fetch project details for editing
  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      setDataLoading(true);
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        toast.error("Error fetching project details");
        console.error(error);
      } else if (data) {
        setFormData({
          title: data.title,
          status: data.status,
          is_featured: data.is_featured.toString(),
          description: data.description,
          image_url: data.image_url,
          tags: data.tags ? data.tags.join(", ") : "",
          frontend_repo: data.frontend_repo || "",
          backend_repo: data.backend_repo || "",
          github_url: data.github_url || "",
          live_url: data.live_url || "",
          member_id: data.member_id?.toString() || ""
        });
      }
      setDataLoading(false);
    }
    fetchProject();
  }, [id]);

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.image_url;
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        image_url: finalImageUrl,
        tags: formData.tags.split(",").map(t => t.trim()).filter(t => t !== ""),
        frontend_repo: formData.frontend_repo || null,
        backend_repo: formData.backend_repo || null,
        github_url: formData.github_url || null,
        live_url: formData.live_url || null,
        status: formData.status,
        is_featured: formData.is_featured === "true",
        member_id: formData.member_id ? parseInt(formData.member_id) : null
      };

      if (id) {
        const { error } = await supabase
          .from("portfolio")
          .update(projectData)
          .eq("id", id);
        if (error) throw error;
        toast.success("Project updated successfully");
      } else {
        const { error } = await supabase
          .from("portfolio")
          .insert(projectData);
        if (error) throw error;
        toast.success("Project published successfully");
      }
      navigate("/portfolio/view");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">
            {id ? "Edit Project" : "Add Portfolio"}
          </div>
          <div className="text-white/55 mt-1">
            {id ? "Update your project case study." : "Create a new project entry for your website portfolio."}
          </div>
        </div>
        <Link
          to="/portfolio/view"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          View Projects
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {dataLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white/3 rounded-2xl border border-white/10 backdrop-blur">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="text-white/40 text-sm mt-4 font-medium animate-pulse">Loading project data...</div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)] space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block space-y-2">
                  <div className="text-sm text-white/70">Member Name</div>
                  <select 
                    value={formData.member_id}
                    onChange={e => setFormData({ ...formData, member_id: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25"
                  >
                    <option value="" className="bg-[#0b1220]">Select Member</option>
                    {experts.map(ex => (
                      <option key={ex.id} value={ex.id} className="bg-[#0b1220]">{ex.name}</option>
                    ))}
                  </select>
                </label>
                <label className="block space-y-2">
                  <div className="text-sm text-white/70">Project Title</div>
                  <input
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="DroneTv"
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25"
                    required
                  />
                </label>
                
                <label className="block space-y-2 md:col-span-2">
                  <div className="text-sm text-white/70">Feature Status</div>
                  <select
                    value={formData.is_featured}
                    onChange={e => setFormData({ ...formData, is_featured: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                  >
                    <option value="true" className="bg-[#0b1220]">True (Show in featured section)</option>
                    <option value="false" className="bg-[#0b1220]">False</option>
                  </select>
                </label>
                <label className="block space-y-2 md:col-span-2">
                  <div className="text-sm text-white/70">Description</div>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Developed a full-featured web platform..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none resize-none"
                    required
                  />
                </label>
                <label className="block space-y-2 md:col-span-2">
                  <div className="text-sm text-white/70">Project Image</div>
                  <div className="flex gap-4 items-center">
                    {(imageFile || formData.image_url) && (
                      <img
                        src={imageFile ? URL.createObjectURL(imageFile) : formData.image_url}
                        alt="Preview"
                        className="w-16 h-16 rounded-lg object-cover border border-white/10"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="block w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-white/5 file:text-white hover:file:bg-white/10"
                    />
                  </div>
                </label>
                <label className="block space-y-2 md:col-span-2">
                  <div className="text-sm text-white/70">Tags (comma separated)</div>
                  <input
                    value={formData.tags}
                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React, Typescript, OpenAI, Tailwind CSS"
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                    required
                  />
                </label>
                <label className="block space-y-2">
                  <div className="text-sm text-white/70">Frontend Repo URL</div>
                  <input
                    value={formData.frontend_repo}
                    onChange={e => setFormData({ ...formData, frontend_repo: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                  />
                </label>
                <label className="block space-y-2">
                  <div className="text-sm text-white/70">Backend Repo URL</div>
                  <input
                    value={formData.backend_repo}
                    onChange={e => setFormData({ ...formData, backend_repo: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                  />
                </label>
                <label className="block space-y-2 md:col-span-2">
                  <div className="text-sm text-white/70">GitHub URL</div>
                  <input
                    value={formData.github_url}
                    onChange={e => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/user/project"
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                  />
                </label>
                <label className="block space-y-2 md:col-span-2">
                  <div className="text-sm text-white/70">Live URL</div>
                  <input
                    value={formData.live_url}
                    onChange={e => setFormData({ ...formData, live_url: e.target.value })}
                    placeholder="https://www.example.com"
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                  />
                </label>
              </div>

              <div className="mt-8 pt-5 border-t border-white/5 flex flex-wrap items-end justify-between gap-4">
                <label className="block space-y-2 flex-1 min-w-[200px]">
                  <div className="text-sm text-white/70 font-medium">Project Status</div>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500/50 transition-colors"
                  >
                    <option value="active" className="bg-[#0b1220]">Active</option>
                    <option value="deactive" className="bg-[#0b1220]">Deactive</option>
                  </select>
                </label>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/portfolio/view")}
                    className="h-11 px-6 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-11 px-8 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-bold shadow-[0_18px_40px_rgba(124,58,237,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "Saving..." : (id ? "Update Project" : "Publish Project")}
                  </button>
                </div>
              </div>
            </form>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)] h-fit">
              <div className="text-white font-semibold">JSON Preview Format</div>
              <div className="text-white/55 text-sm mt-1">Expected project object structure.</div>
              <pre className="mt-4 rounded-xl bg-[#0b1020] border border-white/10 p-4 text-[10px] text-white/80 overflow-auto max-h-[500px]">
                {JSON.stringify({
                  title: formData.title || "Untitled",
                  description: formData.description || "No description provided",
                  image: imageFile ? "Binary Image Data" : formData.image_url || "/images/placeholder.png",
                  tags: formData.tags.split(",").map(t => t.trim()).filter(t => t !== ""),
                  links: {
                    github: formData.github_url || "",
                    live: formData.live_url || "",
                    frontend: formData.frontend_repo || "",
                    backend: formData.backend_repo || ""
                  },
                  status: formData.status,
                  is_featured: formData.is_featured === "true",
                  member_id: formData.member_id
                }, null, 2)}
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
