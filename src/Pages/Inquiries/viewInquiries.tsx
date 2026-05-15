import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase";
import { toast } from "react-toastify";
import Loading from "../../../loading";

// In Viewcategories: import Loading from "../../../loading"; 
// From src/Pages/Categories/Viewcategories.tsx: ../../../loading is root/loading.tsx
// From src/Pages/Inquiries/viewInquiries.tsx: ../../../loading is also root/loading.tsx

type InquiryItem = {
    id: number
    created_at: string
    name: string
    email: string
    message: string
    is_read: boolean
}

export default function ViewInquiries() {
    const [rows, setRows] = useState<InquiryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null)

    const fetchInquiries = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from("contact_inquiries")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
            toast.error("Failed to fetch inquiries");
        } else {
            setRows(data || []);
        }
        setLoading(false)
    }

    const onDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this inquiry?")) {
            const { error } = await supabase
                .from("contact_inquiries")
                .delete()
                .eq("id", id);

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Deleted Successfully");
                fetchInquiries()
            }
        }
    };

    const onToggleRead = async (id: number, currentStatus: boolean) => {
        const { error } = await supabase
            .from("contact_inquiries")
            .update({ is_read: !currentStatus })
            .eq("id", id);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success(currentStatus ? "Marked as Unread" : "Marked as Read");
            fetchInquiries()
        }
    }

    useEffect(() => {
        fetchInquiries()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="max-w-full space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <div className="text-white text-2xl font-semibold tracking-tight">Contact Inquiries</div>
                    <div className="text-white/55 mt-1">Manage and view messages received from the contact form.</div>
                </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-4 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
                <div className="space-y-3">
                    {rows.length > 0 ? rows.map((row, index) => (
                        <div
                            key={row.id}
                            className={`rounded-xl border transition-all ${row.is_read
                                ? "bg-[#08122b]/50 border-white/5 opacity-80"
                                : "bg-[#08122b] border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                } px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4`}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-white/40 text-xs font-mono">#{index + 1}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] uppercase tracking-wider font-bold text-white/30">Sender:</span>
                                        <span className={`text-sm font-medium ${row.is_read ? 'text-white/70' : 'text-white'}`}>
                                            {row.name}
                                        </span>
                                    </div>
                                    {!row.is_read && (
                                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-white/30">Email:</span>
                                    <div className="text-white/50 text-xs truncate">{row.email}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-white/30">Message:</span>
                                    <div className="text-white/80 text-sm line-clamp-1 italic">
                                        "{row.message}"
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right mr-2 hidden lg:block">
                                    <div className="text-white/30 text-[10px] uppercase tracking-wider font-bold">Received At</div>
                                    <div className="text-white/60 text-xs">{new Date(row.created_at).toLocaleDateString()}</div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedInquiry(row)}
                                    className="h-9 px-4 cursor-pointer rounded-xl text-xs bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
                                >
                                    View Message
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onToggleRead(row.id, row.is_read)}
                                    className={[
                                        "h-9 px-4 rounded-xl text-xs border font-medium cursor-pointer transition",
                                        row.is_read
                                            ? "bg-amber-500/10 text-amber-200 border-amber-500/20 hover:bg-amber-500/20"
                                            : "bg-emerald-500/10 text-emerald-200 border-emerald-500/20 hover:bg-emerald-500/20",
                                    ].join(" ")}
                                >
                                    {row.is_read ? "Mark Unread" : "Mark Read"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onDelete(row.id)}
                                    className="h-9 w-9 flex items-center justify-center cursor-pointer rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition"
                                    title="Delete Inquiry"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="py-20 text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                            </div>
                            <div className="text-white/60 font-medium">No inquiries found</div>
                            <p className="text-white/30 text-sm mt-1">When clients contact you, their messages will appear here.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Message Modal */}
            {selectedInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl bg-[#0b1730] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <h3 className="text-lg font-semibold text-white">Message from {selectedInquiry.name}</h3>
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="text-white/50 hover:text-white transition cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-white/30">Sender Name</label>
                                    <div className="text-white font-medium">{selectedInquiry.name}</div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-white/30">Email Address</label>
                                    <div className="text-indigo-400 font-medium">{selectedInquiry.email}</div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-white/30">Date Received</label>
                                    <div className="text-white/70">{new Date(selectedInquiry.created_at).toLocaleString()}</div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-white/30">Status</label>
                                    <div>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${selectedInquiry.is_read ? 'bg-white/10 text-white/50' : 'bg-indigo-500 text-white'}`}>
                                            {selectedInquiry.is_read ? 'Read' : 'New Message'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <label className="text-[10px] uppercase tracking-wider font-bold text-white/30 block mb-2">Message Content</label>
                                <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-white/90 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto custom-scrollbar">
                                    {selectedInquiry.message}
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-white/2 border-t border-white/10 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    if (!selectedInquiry.is_read) onToggleRead(selectedInquiry.id, false);
                                    setSelectedInquiry(null);
                                }}
                                className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition cursor-pointer"
                            >
                                Close & Mark as Read
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
