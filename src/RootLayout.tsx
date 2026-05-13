import Header from "./common/Header"
import Sidebar from "./common/Sidebar"
import { Outlet } from "react-router"

export default function RootLayout() {
  return (
    <div className="min-h-svh flex flex-col bg-[#0b1220] text-slate-200">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0b1220]/70 backdrop-blur">
        <Header />
      </header>

      <div className="flex-1 min-h-0 flex">
        <aside className="basis-1/5 w-1/5 min-w-[260px] max-w-[320px] border-r border-white/10">
          <Sidebar />
        </aside>

        <main className="basis-4/5 w-4/5 min-w-0 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
