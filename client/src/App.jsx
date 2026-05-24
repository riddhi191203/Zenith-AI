import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

const toolRoutes = [
  { index: true, element: <Dashboard /> },
  { path: "write-article", element: <WriteArticle /> },
  { path: "blog-titles", element: <BlogTitles /> },
  { path: "generate-images", element: <GenerateImages /> },
  { path: "remove-background", element: <RemoveBackground /> },
  { path: "review-resume", element: <ReviewResume /> },
  { path: "community", element: <Community /> },
];

const toastOptions = {
  duration: 3000,
  style: {
    background: "rgba(255,255,255,0.9)",
    color: "#0f172a",
    border: "1px solid rgba(191,219,254,0.6)",
    backdropFilter: "blur(18px)",
    borderRadius: "18px",
    padding: "14px 18px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
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
};

const App = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#f8fbff] via-[#eef5ff] to-white text-slate-800">
      <Toaster position="top-right" reverseOrder={false} toastOptions={toastOptions} />
      <div className="relative z-10 h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/ai" element={<Layout />}>
              {toolRoutes.map((route) => (
                <Route key={route.path || "dashboard"} {...route} />
              ))}
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
