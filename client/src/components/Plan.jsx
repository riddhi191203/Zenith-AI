import React from "react";

import {
  Sparkles,
  ShieldCheck,
  Zap,
  Check,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description:
      "Perfect for getting started with Zenith AI.",
    features: [
      "10 AI generations/day",
      "Basic image generation",
      "Resume analysis",
      "Community access",
    ],
    button: "Get Started",
    popular: false,
  },

  {
    name: "Pro",
    price: "$9",
    description:
      "Unlock premium AI power and faster generations.",
    features: [
      "Unlimited generations",
      "Advanced AI tools",
      "Priority performance",
      "HD image generation",
      "Premium support",
    ],
    button: "Upgrade Now",
    popular: true,
  },

  {
    name: "Enterprise",
    price: "$29",
    description:
      "Best for teams and large-scale AI workflows.",
    features: [
      "Team collaboration",
      "Unlimited everything",
      "Dedicated support",
      "Custom AI workflows",
      "Enterprise security",
    ],
    button: "Contact Sales",
    popular: false,
  },
];

const Plan = () => {
  return (
    <section className="relative overflow-hidden py-28 px-6 sm:px-16 xl:px-28 bg-gradient-to-b from-[#f8fbff] via-[#eef5ff] to-white">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center">

          <div
            className="
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
            "
          >
            <Sparkles className="w-4 h-4 text-blue-600" />

            <span className="text-sm font-medium text-slate-700">
              Flexible Pricing
            </span>
          </div>

          <h2
            className="
              mt-7
              text-4xl
              sm:text-5xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
              Zenith AI
            </span>{" "}
            Plan
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              mx-auto
              text-slate-600
              text-base
              sm:text-lg
              leading-relaxed
            "
          >
            Start for free and unlock powerful AI tools
            as your creativity grows.
          </p>
        </div>

        {/* Features */}
        <div
          className="
            mt-14
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-5
          "
        >
          <div
            className="
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
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-r
                from-blue-500
                to-blue-600
                flex
                items-center
                justify-center
              "
            >
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

          <div
            className="
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
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-r
                from-slate-600
                to-slate-700
                flex
                items-center
                justify-center
              "
            >
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

          <div
            className="
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
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-r
                from-blue-500
                to-slate-700
                flex
                items-center
                justify-center
              "
            >
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

        {/* Pricing Cards */}
        <div
          className="
            mt-16
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-8
          "
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                relative
                rounded-[32px]
                p-8
                backdrop-blur-2xl
                border
                transition-all
                duration-500
                hover:-translate-y-2
                ${
                  plan.popular
                    ? "bg-gradient-to-b from-blue-600 to-slate-700 text-white border-blue-500 shadow-2xl"
                    : "bg-white/70 border-white/50 shadow-lg"
                }
              `}
            >
              {plan.popular && (
                <div
                  className="
                    absolute
                    top-5
                    right-5
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    bg-white/20
                    text-white
                    border
                    border-white/20
                  "
                >
                  Most Popular
                </div>
              )}

              <h3
                className={`
                  text-2xl
                  font-bold
                  ${
                    plan.popular
                      ? "text-white"
                      : "text-slate-800"
                  }
                `}
              >
                {plan.name}
              </h3>

              <div className="mt-5 flex items-end gap-1">
                <span className="text-5xl font-bold">
                  {plan.price}
                </span>

                <span
                  className={
                    plan.popular
                      ? "text-blue-100"
                      : "text-slate-500"
                  }
                >
                  /month
                </span>
              </div>

              <p
                className={`mt-4 text-sm leading-relaxed ${
                  plan.popular
                    ? "text-blue-100"
                    : "text-slate-500"
                }`}
              >
                {plan.description}
              </p>

              <button
                className={`
                  w-full
                  mt-8
                  py-3
                  rounded-2xl
                  font-medium
                  transition-all
                  duration-300
                  ${
                    plan.popular
                      ? "bg-white text-slate-900 hover:bg-blue-50"
                      : "bg-gradient-to-r from-blue-600 to-slate-700 text-white hover:opacity-90"
                  }
                `}
              >
                {plan.button}
              </button>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`
                        w-5
                        h-5
                        rounded-full
                        flex
                        items-center
                        justify-center
                        ${
                          plan.popular
                            ? "bg-white/20"
                            : "bg-blue-100"
                        }
                      `}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.popular
                            ? "text-white"
                            : "text-blue-700"
                        }`}
                      />
                    </div>

                    <span
                      className={`text-sm ${
                        plan.popular
                          ? "text-blue-50"
                          : "text-slate-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plan;