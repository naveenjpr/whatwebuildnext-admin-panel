import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router";

export default function AddSociallyEngaged() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    platform_name: "",
    url: "",
    status: "active",
    icon_url: ""
  });

  // Fetch record for editing
  useEffect(() => {
    const fetchRecord = async () => {
      if (!id) return;
      setDataLoading(true);
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        toast.error("Error fetching record");
        console.error(error);
      } else if (data) {
        setFormData({
          platform_name: data.platform_name,
          url: data.url,
          status: data.status,
          icon_url: data.icon_url
        });
      }
      setDataLoading(false);
    }
    fetchRecord();
  }, [id]);

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `icons/${fileName}`;

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
      let finalImageUrl = formData.icon_url;
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const socialData = {
        platform_name: formData.platform_name,
        url: formData.url,
        status: formData.status,
        icon_url: finalImageUrl
      };

      if (id) {
        const { error } = await supabase
          .from("social_links")
          .update(socialData)
          .eq("id", id);
        if (error) throw error;
        toast.success("Social link updated successfully");
      } else {
        const { error } = await supabase
          .from("social_links")
          .insert(socialData);
        if (error) throw error;
        toast.success("Social link added successfully");
      }
      navigate("/socially-engaged/view");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white text-2xl font-semibold tracking-tight">
            {id ? "Edit Socially Engaged" : "Add Socially Engaged"}
          </div>
          <div className="text-white/55 mt-1">Add or update your social links (website footer section).</div>
        </div>
        <Link
          to="/socially-engaged/view"
          className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          View
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        {dataLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="text-white/40 text-sm mt-4 font-medium animate-pulse">Loading data...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block space-y-2">
                <div className="text-sm text-white/70">Platform Name</div>
                <input
                  required
                  value={formData.platform_name}
                  onChange={e => setFormData({ ...formData, platform_name: e.target.value })}
                  placeholder="e.g. WhatsApp, LinkedIn"
                  className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
                />
              </label>

              <label className="block space-y-2">
                <div className="text-sm text-white/70">URL</div>
                <input
                  required
                  value={formData.url}
                  onChange={e => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-white/25"
                />
              </label>

              <div className="space-y-2">
                <div className="text-sm text-white/70">Social Icon</div>
                <div className="flex items-center gap-4">
                  <div className="relative group overflow-hidden h-24 w-24 rounded-2xl border-2 border-dashed border-white/10 bg-white/2 hover:border-white/20 transition flex flex-col items-center justify-center text-center p-2">
                    {imageFile ? (
                      <img src={URL.createObjectURL(imageFile)} className="h-full w-full object-contain rounded-xl" alt="preview" />
                    ) : formData.icon_url ? (
                      <img src={formData.icon_url} className="h-full w-full object-contain rounded-xl" alt="current" />
                    ) : (
                      <div className="text-white/30 flex flex-col items-center">
                        <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-[10px]">Upload</span>
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={e => setImageFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                  </div>
                  <div className="text-xs text-white/40">
                    <p>SVG or PNG recommended (1:1 aspect ratio)</p>
                    <p className="mt-1">Max size: 2MB</p>
                  </div>
                </div>
              </div>

              <label className="block space-y-2">
                <div className="text-sm text-white/70">Status</div>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/25"
                >
                  <option value="active" className="bg-[#0b1220]">Active</option>
                  <option value="deactive" className="bg-[#0b1220]">Deactive</option>
                </select>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 h-11 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition shadow-[0_10px_20px_rgba(234,179,8,0.2)] disabled:opacity-50"
              >
                {loading ? "Saving..." : id ? "Update Record" : "Save Record"}
              </button>
              <Link
                to="/socially-engaged/view"
                className="px-6 h-11 flex items-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
