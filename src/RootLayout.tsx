import { useState } from "react"
import Header from "./common/Header"
import Sidebar from "./common/Sidebar"
import { Outlet } from "react-router"

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-svh flex flex-col bg-[#0b1220] text-slate-200">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0b1220]/70 backdrop-blur">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      </header>

      <div className="flex-1 min-h-0 flex relative">
        {isSidebarOpen && (
          <aside className="basis-[260px] w-[260px] min-w-[260px] border-r border-white/10 transition-all duration-300 ease-in-out">
            <Sidebar />
          </aside>
        )}

        <main className={`flex-1 min-w-0 overflow-y-auto p-5 transition-all duration-300`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
