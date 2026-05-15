import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router";

export default function AddFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    avatar: "",
    content: "",
    status: "true"
  });

  useEffect(() => {
    const fetchTestimonial = async () => {
      if (!id) return;
      setDataLoading(true);
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        toast.error("Error fetching feedback details");
        console.error(error);
      } else if (data) {
        setFormData({
          name: data.name,
          company: data.company,
          avatar: data.avatar,
          content: data.content,
          status: data.status.toString()
        });
      }
      setDataLoading(false);
    }
    fetchTestimonial();
  }, [id]);

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `feedback/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalAvatarUrl = formData.avatar;
      if (imageFile) {
        finalAvatarUrl = await uploadImage(imageFile);
      }

      const obj = {
        name: formData.name,
        company: formData.company,
        avatar: finalAvatarUrl,
        content: formData.content,
        status: formData.status === "true",
      }

      if (id) {
        const { error } = await supabase
          .from("feedback")
          .update(obj)
          .eq("id", id);
        
        if (error) throw error;
        toast.success("Feedback updated successfully");
      } else {
        const { error } = await supabase
          .from("feedback")
          .insert(obj);
        
        if (error) throw error;
        toast.success("Feedback added successfully");
      }
      navigate("/testimonials/view");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-full space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">
            {id ? "Edit Feedback" : "Add Feedback"}
          </div>
          <div className="text-white/55 mt-1">
            {id ? "Update the partner testimonial details." : "Create a new testimonial card for the website."}
          </div>
        </div>
        <Link
          to="/testimonials/view"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          View All
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
              <div className="text-white/55 text-sm mt-1">Fill fields and publish to live website.</div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block space-y-2">
                    <div className="text-sm text-white/70">Name</div>
                    <input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Rahul Sharma"
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
                      required
                    />
                  </label>
                  <label className="block space-y-2">
                    <div className="text-sm text-white/70">Company</div>
                    <input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="TechNova Solutions"
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
                      required
                    />
                  </label>
                  
                  <label className="block space-y-2 md:col-span-2">
                    <div className="text-sm text-white/70">Author Avatar</div>
                    <div className="flex gap-4 items-center">
                      {(imageFile || formData.avatar) && (
                        <img
                          src={imageFile ? URL.createObjectURL(imageFile) : formData.avatar}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover border border-white/10"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-white/5 file:text-white hover:file:bg-white/10 cursor-pointer"
                      />
                    </div>
                  </label>

                  <label className="block space-y-2 md:col-span-2">
                    <div className="text-sm text-white/70">Content</div>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Amazing experience working with the team..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25 resize-none"
                      required
                    />
                  </label>
                  <label className="block space-y-2 md:col-span-2">
                    <div className="text-sm text-white/70">Status</div>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
                    onClick={() => navigate("/testimonials/view")}
                    className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="h-10 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "Saving..." : (id ? "Update Feedback" : "Publish")}
                  </button>
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.35)] h-fit">
              <div className="text-white font-semibold">Preview</div>
              <div className="text-white/55 text-sm mt-1">This is how it will look on the website.</div>

              <div className="mt-5 p-7 rounded-[32px] relative flex flex-col border border-white/10 bg-white/3">
                <div className="absolute top-6 right-6 text-blue-400/20" aria-hidden="true">
                  <QuoteIcon />
                </div>

                <p className="text-slate-300 italic mb-8 relative z-10 font-light leading-relaxed min-h-[100px]">
                  “{formData.content || "Your feedback content will appear here..."}”
                </p>

                <div className="mt-auto flex items-center gap-4">
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : formData.avatar || "/images/default_avatar.png"}
                    alt="Preview avatar"
                    className="w-12 h-12 rounded-full border-2 border-blue-500/30 object-cover bg-white/5"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/default_avatar.png" }}
                  />
                  <div className="min-w-0">
                    <h4 className="text-white font-bold text-sm truncate">{formData.name || "Rahul Sharma"}</h4>
                    <p className="text-slate-500 text-xs uppercase tracking-wider truncate">
                      {formData.company || "TechNova Solutions"}
                    </p>
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

function QuoteIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.2 11.5H6.8c.2-2.2 1.4-3.5 3.5-4.1V5.2C6.8 6 5 8.4 5 12v6h5.2v-6.5Zm8 0h-3.4c.2-2.2 1.4-3.5 3.5-4.1V5.2c-3.5.8-5.3 3.2-5.3 6.8v6h5.2v-6.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
