import { useEffect, useRef, useState } from "react"
import { IoClose, IoReorderThree } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../../utils/supabase";
import { useDispatch } from "react-redux"
import { logOut } from "../redux/adminslice"

export default function Header({ onToggleSidebar, isSidebarOpen }: { onToggleSidebar: () => void, isSidebarOpen: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    function onDown(event: MouseEvent) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    function onEsc(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onEsc)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onEsc)
    }
  }, [])

  async function onSignOut() {
    setMenuOpen(false)
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error.message)
    }
    dispatch(logOut()) // Clear Redux and Cookies
    navigate("/login")
  }

  return (
    <div className="h-14 px-5 flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-9 w-9 rounded-xl grid place-items-center bg-white/10 border border-white/10">
          <span className="" aria-hidden="true">
            {"</>"}
          </span>

        </div>
        <div className="min-w-0">
          <div className="text-white font-semibold leading-5 truncate">WhatWeBuildNext</div>
          <div className="text-xs text-white/55 truncate">Engineering Excellence • Admin</div>
        </div>
        <span
          onClick={onToggleSidebar}
          className="text-white/50 font-bold text-lg cursor-pointer hover:text-white transition p-1 rounded-md hover:bg-white/5  block"
        >
          {!isSidebarOpen ? <IoClose size={24} /> : <IoReorderThree size={24} />}
        </span>
      </div>

      <div className="flex items-center gap-3 relative" ref={menuRef}>

        <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-xl bg-white/5 border border-white/10">
          <span className="text-white/60 text-sm">Search</span>
          <span className="text-white/30 text-xs font-mono">Ctrl K</span>
        </div>
        <button
          type="button"
          className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          Notifications
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="h-9 w-9 rounded-full overflow-hidden border border-white/10 bg-white/10"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label="Open user menu"
        >
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="User"
            className="h-full w-full object-cover"
          />
        </button>

        {menuOpen ? (
          <div className="absolute right-0 top-12 w-60 rounded-xl bg-white text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.35)] py-2 z-50">
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-3 hover:bg-slate-100 transition"
              role="menuitem"
            >
              Your profile
            </Link>
            <Link
              to="/settings"
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-3 hover:bg-slate-100 transition"
              role="menuitem"
            >
              Settings
            </Link>
            <button
              type="button"
              onClick={onSignOut}
              className="block w-full text-left px-5 py-3 hover:bg-slate-100 transition"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
