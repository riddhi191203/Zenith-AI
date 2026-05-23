import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="relative px-4 sm:px-16 xl:px-28 py-24 overflow-hidden bg-gradient-to-b from-[#f8fbff] via-[#eef5ff] to-[#dcecff]">

      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-300/30 rounded-full blur-3xl"></div>

      {/* Heading */}
      <div className="relative text-center z-10">
        <p className="inline-block px-4 py-1 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full shadow-sm">
          Zenith AI Suite
        </p>

        <h2 className="text-slate-800 text-4xl sm:text-5xl font-bold leading-tight">
          Supercharge Your Creativity <br />
          With <span className="text-blue-600">Zenith AI</span>
        </h2>

        <p className="mt-5 text-slate-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Explore powerful AI tools designed to help you generate content,
          create stunning visuals, enhance images, and optimize resumes —
          all in one modern AI workspace.
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 flex flex-wrap justify-center gap-8 mt-16">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            onClick={() => user && navigate(tool.path)}
            className="
              group
              relative
              w-full
              sm:w-[320px]
              p-8
              rounded-3xl
              border
              border-white/40
              bg-white/60
              backdrop-blur-xl
              shadow-[0_8px_30px_rgb(0,0,0,0.06)]
              hover:shadow-blue-200/50
              hover:-translate-y-2
              transition-all
              duration-500
              cursor-pointer
              overflow-hidden
            "
          >
            {/* Gradient Hover Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-50/50 to-slate-100/40"></div>

            {/* Icon */}
            <div
              className="
                relative
                w-14
                h-14
                rounded-2xl
                flex
                items-center
                justify-center
                shadow-lg
              "
              style={{
                background: `linear-gradient(to bottom right, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            >
              <tool.Icon className="w-7 h-7 text-white" />
            </div>

            {/* Content */}
            <div className="relative mt-6">
              <h3 className="text-xl font-semibold text-slate-800 group-hover:text-blue-700 transition">
                {tool.title}
              </h3>

              <p className="mt-3 text-slate-500 leading-relaxed text-sm">
                {tool.description}
              </p>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;