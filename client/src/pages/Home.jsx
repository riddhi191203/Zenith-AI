import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import Testimonial from "../components/Testimonial";
import Plan from "../components/Plan";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="
      relative
      overflow-hidden
      bg-gradient-to-b
      from-[#f8fbff]
      via-[#eef5ff]
      to-white
      text-slate-800
    ">

      {/* Global Background Effects */}
      <div className="
        fixed
        top-[-150px]
        left-[-120px]
        w-[420px]
        h-[420px]
        bg-blue-300/20
        rounded-full
        blur-3xl
        pointer-events-none
      "></div>

      <div className="
        fixed
        bottom-[-200px]
        right-[-150px]
        w-[500px]
        h-[500px]
        bg-slate-300/20
        rounded-full
        blur-3xl
        pointer-events-none
      "></div>

      {/* Noise Overlay */}
      <div className="
        fixed
        inset-0
        opacity-[0.03]
        pointer-events-none
        bg-[url('https://www.transparenttextures.com/patterns/noise.png')]
      "></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Sections */}
      <div className="relative z-10">

        {/* Hero */}
        <Hero />

        {/* AI Tools */}
        <section className="relative">
          <AiTools />
        </section>

        {/* Testimonials */}
        <section className="relative">
          <Testimonial />
        </section>

        {/* Pricing */}
        <section className="relative">
          <Plan />
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default Home;