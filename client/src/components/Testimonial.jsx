import React from "react";
import { assets } from "../assets/assets";
import {
  Quote,
  Sparkles,
} from "lucide-react";

const Testimonial = () => {
  const dummyTestimonialData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "John Doe",
      title: "Marketing Director, TechCorp",
      content:
        "Zenith AI completely transformed our workflow. The AI article writer and image generation tools save us countless hours every single week.",
      rating: 5,
    },

    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Jane Smith",
      title: "Content Creator, CreativeLabs",
      content:
        "The quality of the AI-generated content is outstanding. Zenith AI feels premium, fast, and incredibly intuitive to use.",
      rating: 5,
    },

    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      name: "David Lee",
      title: "Startup Founder, VisionX",
      content:
        "From resume analysis to image editing, Zenith AI provides everything in one place. The modern UI and speed are unmatched.",
      rating: 4,
    },
  ];

  return (
    <section className="relative overflow-hidden py-28 px-6 sm:px-16 xl:px-28 bg-gradient-to-b from-white via-[#f8fbff] to-[#eef5ff]">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

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
              Trusted Worldwide
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
            Loved by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
              Creators
            </span>
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
            Discover why creators, developers, and businesses
            trust Zenith AI to accelerate productivity and
            elevate their creative workflow.
          </p>
        </div>

        {/* Testimonials */}
        <div className="
          mt-16
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
        ">

          {dummyTestimonialData.map((testimonial, index) => (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/50
                bg-white/70
                backdrop-blur-2xl
                p-8
                shadow-[0_8px_40px_rgb(0,0,0,0.06)]
                hover:-translate-y-2
                hover:shadow-blue-200/40
                transition-all
                duration-500
              "
            >

              {/* Glow Effect */}
              <div className="
                absolute
                top-0
                right-0
                w-40
                h-40
                bg-blue-200/20
                rounded-full
                blur-3xl
              "></div>

              {/* Quote Icon */}
              <div className="
                relative
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-slate-700
                flex
                items-center
                justify-center
                shadow-lg
              ">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mt-6">
                {Array(5)
                  .fill(0)
                  .map((_, starIndex) => (
                    <img
                      key={starIndex}
                      src={
                        starIndex < testimonial.rating
                          ? assets.star_icon
                          : assets.star_dull_icon
                      }
                      className="w-4 h-4"
                      alt="star"
                    />
                  ))}
              </div>

              {/* Review */}
              <p className="
                mt-6
                text-slate-600
                leading-relaxed
                text-[15px]
              ">
                “{testimonial.content}”
              </p>

              {/* Divider */}
              <div className="my-7 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent"></div>

              {/* User */}
              <div className="flex items-center gap-4">

                <img
                  src={testimonial.image}
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    object-cover
                    border
                    border-white
                    shadow-md
                  "
                  alt={testimonial.name}
                />

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="
          mt-20
          grid
          grid-cols-2
          md:grid-cols-4
          gap-6
        ">

          {[
            ["10K+", "Active Users"],
            ["500K+", "AI Generations"],
            ["99%", "Customer Satisfaction"],
            ["24/7", "AI Availability"],
          ].map(([value, label], index) => (
            <div
              key={index}
              className="
                text-center
                p-6
                rounded-3xl
                bg-white/60
                backdrop-blur-xl
                border
                border-white/50
                shadow-lg
              "
            >
              <h3 className="
                text-3xl
                font-bold
                bg-gradient-to-r
                from-blue-600
                to-slate-700
                bg-clip-text
                text-transparent
              ">
                {value}
              </h3>

              <p className="mt-2 text-slate-600">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;