import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  Star,
} from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f8fbff] via-[#eef5ff] to-[#dcecff] flex items-center justify-center px-6 sm:px-16 xl:px-28">

      {/* Background Blur Effects */}
      <div className="absolute top-[-100px] left-[-80px] w-[350px] h-[350px] bg-blue-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-100px] w-[420px] h-[420px] bg-slate-300/30 rounded-full blur-3xl"></div>

      {/* Floating Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-blue-100 shadow-md">
          <Sparkles className="w-4 h-4 text-blue-600" />

          <span className="text-sm font-medium text-slate-700">
            Powered by Next-Gen AI
          </span>
        </div>

        {/* Heading */}
        <h1 className="
          mt-8
          text-4xl
          sm:text-6xl
          xl:text-7xl
          font-bold
          leading-[1.1]
          tracking-tight
          text-slate-900
        ">
          Elevate Your Creativity <br />

          With{" "}
          <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
            Zenith AI
          </span>
        </h1>

        {/* Description */}
        <p className="
          mt-8
          max-w-2xl
          mx-auto
          text-base
          sm:text-lg
          leading-relaxed
          text-slate-600
        ">
          Create powerful articles, generate stunning AI images,
          analyze resumes, remove backgrounds, and unlock
          productivity with an intelligent all-in-one AI platform.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-5 mt-10">

          {/* Primary Button */}
          <button
            onClick={() => navigate("/ai")}
            className="
              group
              inline-flex
              items-center
              gap-3
              px-8
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-slate-700
              text-white
              font-medium
              shadow-xl
              hover:scale-105
              active:scale-95
              transition-all
              duration-300
            "
          >
            Start Creating

            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>

          {/* Secondary Button */}
          <button
            className="
              inline-flex
              items-center
              gap-3
              px-8
              py-4
              rounded-2xl
              bg-white/70
              backdrop-blur-xl
              border
              border-blue-100
              text-slate-700
              font-medium
              shadow-md
              hover:bg-white
              hover:scale-105
              active:scale-95
              transition-all
              duration-300
            "
          >
            <PlayCircle className="w-5 h-5 text-blue-600" />

            Watch Demo
          </button>
        </div>

        {/* Trusted Users */}
        <div className="
          mt-14
          flex
          flex-col
          sm:flex-row
          items-center
          justify-center
          gap-5
          text-slate-600
        ">
          <div className="flex items-center">
            <img
              src={assets.user_group}
              alt="users"
              className="h-12"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <span className="text-sm sm:text-base font-medium">
              Trusted by 10,000+ creators worldwide
            </span>
          </div>
        </div>

        {/* Floating Preview Card */}
        <div className="
          hidden
          xl:flex
          absolute
          right-10
          top-1/2
          -translate-y-1/2
          flex-col
          gap-4
        ">

          
        </div>
      </div>
    </section>
  );
};

export default Hero;