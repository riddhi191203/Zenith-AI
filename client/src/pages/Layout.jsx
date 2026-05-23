import React, { useState } from "react";

import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import { assets } from "../assets/assets";

import {
  Menu,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

import {
  SignIn,
  useUser,
} from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();

  const [sidebar, setSidebar] =
    useState(false);

  const { user } = useUser();

  return user ? (
    <div className="
      relative
      flex
      flex-col
      h-screen
      overflow-hidden
      bg-gradient-to-b
      from-[#f8fbff]
      via-[#eef5ff]
      to-white
    ">

      {/* TOP NAVBAR */}
      <header
        className="
          relative
          z-50
          w-full
          h-16
          px-4
          sm:px-6
          flex
          items-center
          justify-between
          bg-white/90
          backdrop-blur-xl
          border-b
          border-slate-200
          shadow-sm
        "
      >

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="
            flex
            items-center
            gap-3
            cursor-pointer
            group
          "
        >
          <img
            className="
              w-9
              h-9
              object-contain
              group-hover:scale-105
              transition
            "
            src={assets.logo}
            alt="Zenith AI"
          />

          <div>
            <h1 className="
              text-xl
              font-bold
              tracking-tight
              bg-gradient-to-r
              from-blue-600
              to-slate-700
              bg-clip-text
              text-transparent
            ">
              Zenith AI
            </h1>

            <p className="
              text-xs
              text-slate-500
              -mt-1
            ">
              AI Workspace
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="
          flex
          items-center
          gap-4
        ">

          {/* Mobile Menu */}
          <button
            onClick={() =>
              setSidebar(!sidebar)
            }
            className="
              sm:hidden
              w-11
              h-11
              rounded-2xl
              bg-white
              border
              border-blue-100
              shadow-md
              flex
              items-center
              justify-center
            "
          >
            {sidebar ? (
              <X className="
                w-5
                h-5
                text-slate-700
              " />
            ) : (
              <Menu className="
                w-5
                h-5
                text-slate-700
              " />
            )}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="
        relative
        z-10
        flex
        flex-1
        overflow-hidden
      ">

        {/* Sidebar */}
        <Sidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
        />

        {/* Main Outlet */}
        <main className="
          relative
          flex-1
          overflow-hidden
        ">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className="
      relative
      min-h-screen
      flex
      items-center
      justify-center
      overflow-hidden
      bg-gradient-to-b
      from-[#f8fbff]
      via-[#eef5ff]
      to-white
      px-6
    ">

      {/* Background Blur */}
      <div className="
        absolute
        top-[-120px]
        left-[-120px]
        w-[350px]
        h-[350px]
        bg-blue-300/20
        rounded-full
        blur-3xl
      "></div>

      <div className="
        absolute
        bottom-[-180px]
        right-[-150px]
        w-[420px]
        h-[420px]
        bg-slate-300/20
        rounded-full
        blur-3xl
      "></div>

      {/* Sign In Card */}
      <div className="
        relative
        z-10
        rounded-[36px]
        border
        border-white/50
        bg-white/70
        backdrop-blur-2xl
        shadow-[0_8px_40px_rgb(0,0,0,0.08)]
        p-4
      ">
        <SignIn />
      </div>
    </div>
  );
};

export default Layout;
