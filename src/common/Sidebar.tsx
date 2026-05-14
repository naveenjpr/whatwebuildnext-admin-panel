import { useState } from "react"
import { NavLink } from "react-router-dom"

function IconChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-[18px] w-[18px] text-white/80 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.5 7.75L10 12.25L14.5 7.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg className="h-[18px] w-[18px] text-white/80" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M7.75 5.5L12.25 10L7.75 14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconRocket() {
  return (
    <svg className="h-[18px] w-[18px] text-white/90" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M12.9 2.6c2.3.2 4.1 2 4.3 4.3.2 2.3-.8 5.2-3 7.4l-1.2 1.2-5.2-5.2 1.2-1.2c2.2-2.2 5.1-3.2 7.4-3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.1 10.3l-3.6 1.2c-.6.2-1 .7-1.1 1.3L3 16.9l4.1-.4c.6-.1 1.1-.5 1.3-1.1l1.2-3.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M12.9 7.1a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg className="h-[18px] w-[18px] text-white/90" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M7 6V5.2C7 4 8 3 9.2 3h1.6C12 3 13 4 13 5.2V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.5 8.2C3.5 7 4.5 6 5.7 6h8.6c1.2 0 2.2 1 2.2 2.2v6.1c0 1.2-1 2.2-2.2 2.2H5.7c-1.2 0-2.2-1-2.2-2.2V8.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 10.5h13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconGradHat() {
  return (
    <svg className="h-[18px] w-[18px] text-white/90" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.8 7.7 10 4l7.2 3.7L10 11.4 2.8 7.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5.3 9.1v3.4c0 .7.4 1.3 1 1.6 1 .5 2.3 1 3.7 1s2.7-.5 3.7-1c.6-.3 1-.9 1-1.6V9.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconAward() {
  return (
    <svg className="h-[18px] w-[18px] text-white/90" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 11.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.2 10.7 6 17l4-2.3L14 17l-1.2-6.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconMail() {
  return (
    <svg className="h-[18px] w-[18px] text-white/90" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 6.5h12c.8 0 1.5.7 1.5 1.5v8c0 .8-.7 1.5-1.5 1.5H4c-.8 0-1.5-.7-1.5-1.5V8c0-.8.7-1.5 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 8.2 10 12.3l6.5-4.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconShare() {
  return (
    <svg className="h-[18px] w-[18px] text-white/90" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M6.2 11.2 13.7 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.7 5 6.2 8.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.8 16.2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.8 7.8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.2 12.2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function IconCode() {
  return (
    <svg className="h-[18px] w-[18px] text-white/90" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M8 6 4.5 10 8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6 15.5 10 12 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconGrid() {
  return (
    <svg className="h-[18px] w-[18px] text-white/90" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="3" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="11.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function Sidebar() {
  const [openSection, setOpenSection] = useState("projects")

  function toggleSection(section: string) {
    setOpenSection((prev) => (prev === section ? "" : section))
  }

  return (
    <nav
      className=" h-full overflow-y-auto box-border px-[14px] py-[18px] text-white/85 [background:radial-gradient(1200px_700px_at_-220px_-200px,rgba(99,102,241,0.35),transparent_55%),radial-gradient(900px_650px_at_30px_120px,rgba(168,85,247,0.28),transparent_60%),linear-gradient(180deg,#0b1730_0%,#091225_60%,#08101f_100%)]"
      aria-label="Admin sidebar"
    >

      <div className="px-[6px] pb-4 pt-[6px] border-b border-white/10 mb-[14px]">
        <div className="flex items-center gap-[10px] font-bold tracking-[0.2px]">
          <span
            className="w-7 h-7 grid place-items-center rounded-lg bg-white/10 shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
            aria-hidden="true"
          >
            <IconRocket />
          </span>
          <span className="text-[20px] text-white/90">WWBN Admin</span>
        </div>
        <div className="mt-2 text-xs text-white/50 font-mono">
          Engineering Excellence
        </div>
      </div>

      <div className="px-[6px] py-2 pb-3">
        <NavLink
          className={({ isActive }) =>
            [
              "w-full border border-white/10 cursor-pointer flex items-center justify-between px-[14px] py-3 rounded-[14px] text-white bg-white/5 hover:bg-white/10 transition",
              isActive ? "bg-white/10 border-white/20" : "",
            ].join(" ")
          }
          to="/"
        >
          <span className="flex items-center gap-3">
            <span className="w-[34px] h-[34px] rounded-xl grid place-items-center bg-white/10" aria-hidden="true">
              <IconRocket />
            </span>
            <span className="text-[16px] font-semibold">Dashboard</span>
          </span>
          <IconChevronRight />
        </NavLink>
      </div>

      <div className="px-[6px] py-2 pb-3">
        <button
          className="w-full border border-white/10 cursor-pointer flex items-center justify-between px-[14px] py-3 rounded-[14px] text-white bg-white/5 hover:bg-white/10 transition"
          type="button"
          onClick={() => toggleSection("category")}
        >
          <span className="flex items-center gap-3">
            <span className="w-[34px] h-[34px] rounded-xl grid place-items-center bg-white/10" aria-hidden="true">
              <IconGrid />
            </span>
            <span className="text-[16px] font-semibold">Category</span>
          </span>
          <IconChevronDown open={openSection === "category"} />
        </button>

        <div className={`pt-[10px] px-2 ${openSection === "category" ? "block" : "hidden"}`}>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/categories/add"
          >
            Add Category
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/categories/view"
          >
            View Categories
          </NavLink>
        </div>
      </div>

      <div className="px-[6px] py-2 pb-3">
        <button
          className="w-full border border-white/10 cursor-pointer flex items-center justify-between px-[14px] py-3 rounded-[14px] text-white bg-white/5 hover:bg-white/10 transition"
          type="button"
          onClick={() => toggleSection("team")}
        >
          <span className="flex items-center gap-3">
            <span className="w-[34px] h-[34px] rounded-xl grid place-items-center bg-white/10" aria-hidden="true">
              <IconGradHat />
            </span>
            <span className="text-[16px] font-semibold">Team (Experts)</span>
          </span>
          <IconChevronDown open={openSection === "team"} />
        </button>

        <div className={`pt-[10px] px-2 ${openSection === "team" ? "block" : "hidden"}`}>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/team/add"
          >
            Add Expert
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/team/view"
          >
            View Experts
          </NavLink>
        </div>
      </div>

      <div className="px-[6px] py-2 pb-3">
        <button
          className="w-full border border-white/10 cursor-pointer flex items-center justify-between px-[14px] py-3 rounded-[14px] text-white bg-white/5 hover:bg-white/10 transition"
          type="button"
          onClick={() => toggleSection("skills")}
        >
          <span className="flex items-center gap-3">
            <span className="w-[34px] h-[34px] rounded-xl grid place-items-center bg-white/10" aria-hidden="true">
              <IconCode />
            </span>
            <span className="text-[16px] font-semibold">Skills</span>
          </span>
          <IconChevronDown open={openSection === "skills"} />
        </button>

        <div className={`pt-[10px] px-2 ${openSection === "skills" ? "block" : "hidden"}`}>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/skills/add"
          >
            Add Skill
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/skills/view"
          >
            View Skills
          </NavLink>
        </div>
      </div>



      <div className="px-[6px] py-2 pb-3">
        <button
          className="w-full border border-white/10 cursor-pointer flex items-center justify-between px-[14px] py-3 rounded-[14px] text-white bg-white/5 hover:bg-white/10 transition"
          type="button"
          onClick={() => toggleSection("projects")}
        >
          <span className="flex items-center gap-3">
            <span className="w-[34px] h-[34px] rounded-xl grid place-items-center bg-white/10" aria-hidden="true">
              <IconBriefcase />
            </span>
            <span className="text-[16px] font-semibold">Projects</span>
          </span>
          <IconChevronDown open={openSection === "projects"} />
        </button>

        <div className={`pt-[10px] px-2 ${openSection === "projects" ? "block" : "hidden"}`}>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/portfolio/add"
          >
            Add Case Study
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/portfolio/view"
          >
            View Case Studies
          </NavLink>
        </div>
      </div>

      <div className="px-[6px] py-2 pb-3">
        <button
          className="w-full border border-white/10 cursor-pointer flex items-center justify-between px-[14px] py-3 rounded-[14px] text-white bg-white/5 hover:bg-white/10 transition"
          type="button"
          onClick={() => toggleSection("social")}
        >
          <span className="flex items-center gap-3">
            <span className="w-[34px] h-[34px] rounded-xl grid place-items-center bg-white/10" aria-hidden="true">
              <IconShare />
            </span>
            <span className="text-[16px] font-semibold">Socially Engaged</span>
          </span>
          <IconChevronDown open={openSection === "social"} />
        </button>

        <div className={`pt-[10px] px-2 ${openSection === "social" ? "block" : "hidden"}`}>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/socially-engaged/add"
          >
            Add Social Links
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/socially-engaged/view"
          >
            View Social Links
          </NavLink>
        </div>
      </div>
      <div className="px-[6px] py-2 pb-3">
        <NavLink
          className={({ isActive }) =>
            [
              "w-full border border-white/10 cursor-pointer flex items-center justify-between px-[14px] py-3 rounded-[14px] text-white bg-white/5 hover:bg-white/10 transition",
              isActive ? "bg-white/10 border-white/20" : "",
            ].join(" ")
          }
          to="/messages"
        >
          <span className="flex items-center gap-3">
            <span className="w-[34px] h-[34px] rounded-xl grid place-items-center bg-white/10" aria-hidden="true">
              <IconMail />
            </span>
            <span className="text-[16px] font-semibold">Inquiries</span>
          </span>
          <IconChevronRight />
        </NavLink>
      </div>

      <div className="px-[6px] py-2 pb-3">
        <button
          className="w-full border border-white/10 cursor-pointer flex items-center justify-between px-[14px] py-3 rounded-[14px] text-white bg-white/5 hover:bg-white/10 transition"
          type="button"
          onClick={() => toggleSection("feedback")}
        >
          <span className="flex items-center gap-3">
            <span className="w-[34px] h-[34px] rounded-xl grid place-items-center bg-white/10" aria-hidden="true">
              <IconAward />
            </span>
            <span className="text-[16px] font-semibold">Feedback</span>
          </span>
          <IconChevronDown open={openSection === "feedback"} />
        </button>

        <div className={`pt-[10px] px-2 ${openSection === "feedback" ? "block" : "hidden"}`}>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/testimonials/add"
          >
            Add Feedback
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              [
                "block w-full text-left text-white/55 px-[10px] py-[10px] rounded-[10px] text-[14px] hover:bg-white/5 hover:text-white/75",
                isActive ? "bg-white/5 text-white/85" : "",
              ].join(" ")
            }
            to="/testimonials/view"
          >
            View Feedback
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
