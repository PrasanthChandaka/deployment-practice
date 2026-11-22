import {
  ActivityIcon,
  BoltIcon,
  ChartBar,
  ChevronFirst,
  ChevronLast,
  File,
  LayoutDashboard,
  LogOutIcon,
  NotebookPen,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/Auth.store";
import Button from "../shared/Button";

const sidebarList = [
  { id: 1, label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
  { id: 2, label: "Notes", icon: <NotebookPen size={20} />, path: "/notes" },
  { id: 3, label: "Settings", icon: <Settings size={20} />, path: "/settings" },
  { id: 4, label: "Invoices", icon: <File size={20} />, path: "/invoices" },
  {
    id: 5,
    label: "Accounting",
    icon: <ActivityIcon size={20} />,
    path: "/accounting",
  },
  {
    id: 6,
    label: "Modules",
    icon: <BoltIcon size={20} />,
    path: "/module-access",
  },
  {
    id: 7,
    label: "Chats",
    icon: <ChartBar size={20} />,
    path: "/chats",
  },
];

const Sidebar = () => {
  const { user, clearAuth } = useAuthStore();
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-full">
      <nav className="h-full flex flex-col border-gray-600 border-r shadow-sm p-4">
        <div className="flex justify-between items-center pb-4">
          {expanded && (
            <h1
              className={`text-white font-extrabold font-stretch-50% px-4 ${expanded}:"w-32":"w-0"`}
            >
              PRASANTH
            </h1>
          )}
          <Button onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </Button>
        </div>

        <div className="flex-1 h-full ">
          {sidebarList.map((each) => (
            <NavLink
              to={each.path}
              key={each.id}
              className={({ isActive }) => `
    group relative px-4 py-2 rounded-md flex justify-start items-center gap-2 
    transition-all ease-in-out mb-2
    ${isActive ? "bg-emerald-600 text-white" : "hover:bg-emerald-900 text-gray-300"}
  `}
            >
              <span>{each.icon}</span>

              {expanded && <p className="whitespace-nowrap">{each.label}</p>}

              {!expanded && (
                <div
                  className={`
        absolute left-full rounded-md px-2 py-1 ml-6
        bg-emerald-600 text-white text-sm font-medium
        invisible opacity-0 -translate-x-3 transition-all
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        whitespace-nowrap shadow-md
      `}
                >
                  {each.label}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        <div className="border-gray-600 border-t flex justify-center items-center py-2">
          <div className="py-2 px-4 rounded-md bg-emerald-600 text-center uppercase">
            {user?.username?.charAt(0)}
          </div>
          <div
            className={`
              flex justify-between items-center gap-1
              overflow-hidden transition-all ease-in-out ${expanded ? "w-40 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold capitalize">{user?.username}</h4>
              <span className="text-xs text-emerald-600 font-bold capitalize">
                {user?.roles[0]}
              </span>
            </div>
            <Button
              onClick={() => clearAuth()}
              className="bg-transparent outline-0 hover:bg-gray-700"
            >
              <LogOutIcon size={20} />
            </Button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
