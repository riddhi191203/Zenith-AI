import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
  Sparkles,
  Crown,
  ChevronRight,
} from "lucide-react";

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const navItems = [
  {
    to: "/ai",
    label: "Dashboard",
    Icon: House,
  },

  {
    to: "/ai/write-article",
    label: "Write Article",
    Icon: SquarePen,
  },

  {
    to: "/ai/blog-titles",
    label: "Blog Titles",
    Icon: Hash,
  },

  {
    to: "/ai/generate-images",
    label: "Generate Images",
    Icon: Image,
  },

  {
    to: "/ai/remove-background",
    label: "Remove Background",
    Icon: Eraser,
  },

  {
    to: "/ai/remove-object",
    label: "Remove Object",
    Icon: Scissors,
  },

  {
    to: "/ai/review-resume",
    label: "Review Resume",
    Icon: FileText,
  },

  {
    to: "/ai/community",
    label: "Community",
    Icon: Users,
  },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={`
        fixed
        sm:sticky
        top-16
        sm:top-0
        left-0
        z-40
        h-[calc(100vh-4rem)]
        sm:h-full
        w-[248px]
        bg-white/90
        backdrop-blur-xl
        border-r
        border-slate-200
        shadow-sm
        flex
        flex-col
        justify-between
        transition-all
        duration-300
        ${
          sidebar
            ? "translate-x-0"
            : "max-sm:-translate-x-full"
        }
      `}
    >
      {/* Top Section */}
      <div className="relative z-10 overflow-y-auto px-4 py-5">

        {/* User Info */}
        <div className="flex flex-col items-center text-center">

          <div className="relative">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-blue-600
                border-4
                border-white
                shadow-xl
                flex
                items-center
                justify-center
                text-xl
                font-bold
                text-white
              "
            >
              {initials}
            </div>

            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <h2 className="mt-3 text-base font-semibold text-slate-800">
            {user?.name}
          </h2>

          <p className="text-sm text-slate-500">
            Welcome to Zenith AI
          </p>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-slate-200"></div>

        {/* Navigation */}
        <nav className="space-y-1.5">

          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `
                  group
                  flex
                  items-center
                  justify-between
                  px-4
                  py-2
                  rounded-xl
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? `
                        bg-blue-600
                        text-white
                        shadow-lg
                      `
                      : `
                        text-slate-600
                        hover:bg-blue-50
                      `
                  }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">

                    <div
                      className={`
                        w-8
                        h-8
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        transition
                        ${
                          isActive
                            ? "bg-white/20"
                            : "bg-blue-50"
                        }
                      `}
                      >
                      {React.createElement(Icon, {
                        className: `
                          w-5
                          h-5
                          ${
                            isActive
                              ? "text-white"
                              : "text-blue-600"
                          }
                        `,
                      })}
                    </div>

                    <span className="text-sm font-medium">
                      {label}
                    </span>
                  </div>

                  <ChevronRight
                    className={`
                      w-4
                      h-4
                      transition-transform
                      ${
                        isActive
                          ? "translate-x-1 text-white"
                          : "text-slate-400 group-hover:translate-x-1"
                      }
                    `}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom User Section */}
      <div className="
        relative
        z-10
        p-4
        border-t
        border-slate-200
        bg-white
        backdrop-blur-xl
      ">

        <div className="flex items-center justify-between gap-3">

          {/* User Card */}
          <div
            className="
              flex
              items-center
              gap-3
              cursor-pointer
              flex-1
            "
          >
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-blue-600
                border
                border-white
                shadow-md
                flex
                items-center
                justify-center
                font-semibold
                text-white
              "
            >
              {initials}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                {user?.name}
              </h3>

              <div className="
                flex
                items-center
                gap-1
                mt-1
                text-xs
                text-slate-500
              ">
                <Crown className="w-3.5 h-3.5 text-yellow-500" />

                Premium Plan
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              w-10
              h-10
              rounded-xl
              bg-slate-50
              flex
              items-center
              justify-center
              shadow-md
              hover:bg-red-50
              transition-all
              duration-300
              group
            "
          >
            <LogOut
              className="
                w-5
                h-5
                text-slate-500
                group-hover:text-red-500
                transition
              "
            />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
