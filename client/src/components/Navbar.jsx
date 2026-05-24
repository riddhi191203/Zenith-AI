import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        backdrop-blur-2xl
        bg-white/50
        border-b
        border-white/20
        shadow-sm
      "
    >
      <nav
        className="
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
          px-6
          sm:px-12
          xl:px-20
          py-4
        "
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src={assets.logo}
            alt="Zenith AI"
            className="
              w-10
              h-10
              object-contain
              group-hover:scale-105
              transition
            "
          />

          <div>
            <h1
              className="
                text-2xl
                font-bold
                tracking-tight
                bg-gradient-to-r
                from-blue-600
                to-slate-700
                bg-clip-text
                text-transparent
              "
            >
              Zenith AI
            </h1>

            <p className="text-xs text-slate-500 -mt-1">
              AI Productivity Suite
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">

            <button
              onClick={() => navigate("/")}
              className="hover:text-blue-600 transition"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/ai")}
              className="hover:text-blue-600 transition"
            >
              AI Tools
            </button>

            <button className="hover:text-blue-600 transition">
              Features
            </button>

            <button className="hover:text-blue-600 transition">
              Pricing
            </button>
          </div>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">

              {/* Welcome Badge */}
              <div
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-blue-50
                  border
                  border-blue-100
                  text-sm
                  text-blue-700
                  font-medium
                "
              >
                <Sparkles className="w-4 h-4" />

                Welcome,
                {user?.name || "User"}
              </div>

              {/* User Avatar */}
              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-slate-700
                  flex
                  items-center
                  justify-center
                  text-white
                  font-semibold
                  uppercase
                  shadow-md
                "
              >
                {user?.name?.charAt(0)}
              </div>

              {/* Logout */}
              <button
                onClick={logoutHandler}
                className="
                  p-2
                  rounded-full
                  bg-red-50
                  border
                  border-red-100
                  text-red-500
                  hover:bg-red-100
                  transition
                "
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="
                group
                flex
                items-center
                gap-2
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-slate-700
                text-white
                px-6
                sm:px-8
                py-3
                text-sm
                font-medium
                shadow-lg
                hover:scale-105
                active:scale-95
                transition-all
                duration-300
              "
            >
              Get Started

              <ArrowRight
                className="
                  w-4
                  h-4
                  group-hover:translate-x-1
                  transition
                "
              />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
