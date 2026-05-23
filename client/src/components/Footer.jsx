import React from "react";
import { assets } from "../assets/assets";
import {
  Mail,
  Sparkles,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden mt-28 bg-gradient-to-b from-[#eef5ff] via-[#f8fbff] to-white border-t border-blue-100">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32 pt-16">

        {/* Main Footer */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 pb-12 border-b border-blue-100">

          {/* Brand Section */}
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <img
                className="h-10"
                src={assets.logo}
                alt="Zenith AI"
              />

              <h2 className="text-2xl font-bold text-slate-800">
                Zenith AI
              </h2>
            </div>

            <p className="mt-6 text-slate-600 leading-relaxed">
              Experience next-generation AI tools with Zenith AI.
              Generate articles, create stunning AI images,
              optimize resumes, and enhance productivity with a
              beautifully crafted AI workspace.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-8">
              <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center hover:scale-110 transition cursor-pointer">
                <Github className="w-5 h-5 text-slate-700" />
              </div>

              <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center hover:scale-110 transition cursor-pointer">
                <Linkedin className="w-5 h-5 text-blue-600" />
              </div>

              <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center hover:scale-110 transition cursor-pointer">
                <Twitter className="w-5 h-5 text-sky-500" />
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-16">

            {/* Company */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-6">
                Company
              </h2>

              <ul className="space-y-4 text-slate-600">
                <li className="hover:text-blue-600 transition cursor-pointer">
                  Home
                </li>

                <li className="hover:text-blue-600 transition cursor-pointer">
                  Features
                </li>

                <li className="hover:text-blue-600 transition cursor-pointer">
                  Pricing
                </li>

                <li className="hover:text-blue-600 transition cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>

            {/* AI Tools */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-6">
                AI Tools
              </h2>

              <ul className="space-y-4 text-slate-600">
                <li className="hover:text-blue-600 transition cursor-pointer">
                  AI Article Writer
                </li>

                <li className="hover:text-blue-600 transition cursor-pointer">
                  AI Image Generator
                </li>

                <li className="hover:text-blue-600 transition cursor-pointer">
                  Resume Analyzer
                </li>

                <li className="hover:text-blue-600 transition cursor-pointer">
                  Background Remover
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Stay Updated
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-800">
              Subscribe to our newsletter
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Get the latest AI news, feature updates, and productivity tips delivered directly to your inbox.
            </p>

            {/* Input */}
            <div className="mt-6 flex items-center gap-3">

              <div className="flex items-center flex-1 bg-white border border-blue-100 rounded-2xl px-4 shadow-sm">
                <Mail className="w-5 h-5 text-slate-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    w-full
                    h-12
                    px-3
                    bg-transparent
                    outline-none
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />
              </div>

              <button
                className="
                  h-12
                  px-5
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-slate-700
                  text-white
                  font-medium
                  shadow-lg
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">

          <p>
            © 2026 Zenith AI. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-blue-600 cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="hover:text-blue-600 cursor-pointer transition">
              Terms of Service
            </span>

            <span className="hover:text-blue-600 cursor-pointer transition">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;