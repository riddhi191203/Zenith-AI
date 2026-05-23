import React from "react";

import {
  Route,
  Routes,
} from "react-router-dom";

import {
  Toaster,
} from "react-hot-toast";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";

const App = () => {
  return (
    <div className="
      min-h-screen
      bg-gradient-to-b
      from-[#f8fbff]
      via-[#eef5ff]
      to-white
      text-slate-800
      overflow-hidden
    ">

      {/* Global Toast */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,

          style: {
            background:
              "rgba(255,255,255,0.9)",

            color: "#0f172a",

            border:
              "1px solid rgba(191,219,254,0.6)",

            backdropFilter:
              "blur(18px)",

            borderRadius: "18px",

            padding:
              "14px 18px",

            boxShadow:
              "0 10px 40px rgba(0,0,0,0.08)",
          },

          success: {
            iconTheme: {
              primary: "#2563eb",
              secondary: "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#ffffff",
            },
          },
        }}
      />
      {/* Routes */}
      <div className="relative z-10 h-full">
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* AI DASHBOARD */}
          <Route
            path="/ai"
            element={<Layout />}
          >

            {/* Dashboard */}
            <Route
              index
              element={<Dashboard />}
            />

            {/* Article Writer */}
            <Route
              path="write-article"
              element={<WriteArticle />}
            />

            {/* Blog Titles */}
            <Route
              path="blog-titles"
              element={<BlogTitles />}
            />

            {/* Image Generator */}
            <Route
              path="generate-images"
              element={<GenerateImages />}
            />

            {/* Background Remover */}
            <Route
              path="remove-background"
              element={<RemoveBackground />}
            />

            {/* Object Remover */}
            <Route
              path="remove-object"
              element={<RemoveObject />}
            />

            {/* Resume Analyzer */}
            <Route
              path="review-resume"
              element={<ReviewResume />}
            />

            {/* Community */}
            <Route
              path="community"
              element={<Community />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
