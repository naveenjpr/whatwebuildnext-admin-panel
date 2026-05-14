import { useEffect, useState, useMemo } from "react"
import { supabase } from "../../../utils/supabase";
import { toast } from "react-toastify";
import { Link } from "react-router";

type Testimonial = {
  id: number
  name: string
  role: string
  company: string
  content: string
  avatar: string
  status: boolean
}

export default function ViewFeedback() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTestimonials = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      toast.error("Failed to fetch testimonials");
    } else {
      setTestimonials(data || []);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const activeCount = useMemo(() => testimonials.filter((t) => t.status).length, [testimonials])

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ status: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Status updated");
      fetchTestimonials();
    }
  }

  const deleteTestimonial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Testimonial deleted");
      fetchTestimonials();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="text-white text-2xl font-semibold tracking-tight">Feedback</div>
          <div className="text-white/55 mt-1">Voice of our partners — website testimonials section.</div>
          <div className="text-white/45 text-sm mt-2">
            Active: <span className="text-white/80 font-mono">{activeCount}</span> /{" "}
            <span className="text-white/80 font-mono">{testimonials.length}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to="/testimonials/add"
            className="h-10 inline-flex items-center px-4 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_18px_40px_rgba(124,58,237,0.25)]"
          >
            Add Feedback
          </Link>
          <button
            onClick={fetchTestimonials}
            className="h-10 inline-flex items-center px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="text-center py-6">
        <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-xs mb-4 block">
          Feedback
        </span>
        <h2 className="text-3xl md:text-4xl font-black mb-2 text-white">
          Voice of Our{" "}
          <span className="bg-linear-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            Partners.
          </span>
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="text-white/40 text-sm font-medium animate-pulse">Loading feedback...</div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-white/10 rounded-[32px] bg-white/2">
          <div className="text-white/50 text-lg">No feedback found</div>
          <p className="text-white/30 text-sm mt-2">Click "Add Feedback" to create your first testimonial.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-[32px] relative flex flex-col border border-white/10 bg-white/3 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="absolute top-6 right-6 text-blue-400/20" aria-hidden="true">
                <QuoteIcon />
              </div>

              <p className="text-slate-300 italic mb-8 relative z-10 font-light leading-relaxed">
                “{t.content}”
              </p>

              <div className="mt-auto">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className={[
                      "inline-flex items-center h-7 px-3 rounded-full text-xs border font-mono",
                      t.status
                        ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-200 border-rose-500/20",
                    ].join(" ")}
                  >
                    {t.status ? "status: true" : "status: false"}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleStatus(t.id, t.status)}
                    className="h-8 px-3 rounded-xl bg-white/5 border border-white/10 text-white/75 hover:text-white hover:bg-white/10 transition text-xs cursor-pointer"
                  >
                    Toggle
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar || "/images/default_avatar.png"}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-500/30 object-cover bg-white/5"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/default_avatar.png" }}
                  />
                  <div className="min-w-0">
                    <h4 className="text-white font-bold text-sm truncate">{t.name}</h4>
                    <p className="text-slate-500 text-xs uppercase tracking-wider truncate">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 flex gap-2">
                  <Link
                    to={`/testimonials/add/${t.id}`}
                    className="h-9 px-4 inline-flex items-center rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteTestimonial(t.id)}
                    className="h-9 px-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 hover:bg-rose-500/15 transition text-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
