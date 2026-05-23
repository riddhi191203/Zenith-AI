import React from "react";
import { PricingTable } from "@clerk/clerk-react";
import {
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

const Plan = () => {
  return (
    <section className="relative overflow-hidden py-28 px-6 sm:px-16 xl:px-28 bg-gradient-to-b from-[#f8fbff] via-[#eef5ff] to-white">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center">

          {/* Badge */}
          <div className="
            inline-flex
            items-center
            gap-2
            px-5
            py-2
            rounded-full
            bg-white/70
            backdrop-blur-xl
            border
            border-blue-100
            shadow-md
          ">
            <Sparkles className="w-4 h-4 text-blue-600" />

            <span className="text-sm font-medium text-slate-700">
              Flexible Pricing
            </span>
          </div>

          {/* Heading */}
          <h2 className="
            mt-7
            text-4xl
            sm:text-5xl
            font-bold
            tracking-tight
            text-slate-900
          ">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
              Zenith AI
            </span>{" "}
            Plan
          </h2>

          {/* Description */}
          <p className="
            mt-6
            max-w-2xl
            mx-auto
            text-slate-600
            text-base
            sm:text-lg
            leading-relaxed
          ">
            Start for free and unlock powerful AI tools
            as your creativity grows. Upgrade anytime for
            more generations, faster performance, and premium features.
          </p>
        </div>

        {/* Features Row */}
        <div className="
          mt-14
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-5
        ">

          {/* Feature 1 */}
          <div className="
            flex
            items-center
            gap-4
            p-5
            rounded-3xl
            bg-white/70
            backdrop-blur-xl
            border
            border-white/50
            shadow-lg
          ">
            <div className="
              w-12
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-blue-600
              flex
              items-center
              justify-center
              shadow-md
            ">
              <Zap className="w-5 h-5 text-white" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                Faster AI Responses
              </h3>

              <p className="text-sm text-slate-500">
                Lightning-fast generation speed
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="
            flex
            items-center
            gap-4
            p-5
            rounded-3xl
            bg-white/70
            backdrop-blur-xl
            border
            border-white/50
            shadow-lg
          ">
            <div className="
              w-12
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-slate-600
              to-slate-700
              flex
              items-center
              justify-center
              shadow-md
            ">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                Premium AI Tools
              </h3>

              <p className="text-sm text-slate-500">
                Access advanced AI capabilities
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="
            flex
            items-center
            gap-4
            p-5
            rounded-3xl
            bg-white/70
            backdrop-blur-xl
            border
            border-white/50
            shadow-lg
          ">
            <div className="
              w-12
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-slate-700
              flex
              items-center
              justify-center
              shadow-md
            ">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                Secure & Reliable
              </h3>

              <p className="text-sm text-slate-500">
                Enterprise-grade security
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="
          mt-16
          rounded-[32px]
          bg-white/60
          backdrop-blur-2xl
          border
          border-white/50
          shadow-[0_8px_40px_rgb(0,0,0,0.08)]
          p-4
          sm:p-8
        ">
          <PricingTable />
        </div>
      </div>
    </section>
  );
};

export default Plan;