import React from "react";

import { createRoot } from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  ClerkProvider,
} from "@clerk/clerk-react";

import "./index.css";

import App from "./App.jsx";

// CLERK PUBLISHABLE KEY
const PUBLISHABLE_KEY =
  import.meta.env
    .VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Clerk Publishable Key"
  );
}

// APP ROOT
createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <ClerkProvider
      publishableKey={
        PUBLISHABLE_KEY
      }
      afterSignOutUrl="/"

      appearance={{
        variables: {
          colorPrimary: "#2563eb",

          colorText: "#0f172a",

          colorTextSecondary:
            "#64748b",

          colorBackground:
            "rgba(255,255,255,0.85)",

          colorInputBackground:
            "rgba(255,255,255,0.75)",

          colorInputText:
            "#0f172a",

          borderRadius: "18px",
        },

        elements: {
          /* MAIN CARD */
          card: `
            shadow-2xl
            border
            border-white/50
            backdrop-blur-2xl
            bg-white/70
          `,

          /* ROOT */
          rootBox: "mx-auto",

          /* HEADER */
          headerTitle: `
            text-slate-900
            font-bold
          `,

          headerSubtitle: `
            text-slate-500
          `,

          /* SOCIAL BUTTONS */
          socialButtonsBlockButton: `
            border
            border-blue-100
            hover:bg-blue-50
            transition-all
            duration-300
            rounded-2xl
          `,

          socialButtonsBlockButtonText:
            "text-slate-700 font-medium",

          /* FORM INPUT */
          formFieldInput: `
            rounded-2xl
            border
            border-blue-100
            bg-white/80
            focus:ring-2
            focus:ring-blue-400
            text-slate-700
            transition-all
          `,

          formFieldLabel:
            "text-slate-700 font-medium",

          /* PRIMARY BUTTON */
          formButtonPrimary: `
            bg-gradient-to-r
            from-blue-600
            to-slate-700
            hover:opacity-95
            rounded-2xl
            shadow-lg
            transition-all
            duration-300
          `,

          /* FOOTER */
          footerActionText:
            "text-slate-500",

          footerActionLink: `
            text-blue-600
            hover:text-blue-700
            font-medium
          `,

          /* USER BUTTON */
          userButtonPopoverCard: `
            backdrop-blur-2xl
            bg-white/80
            border
            border-white/40
            shadow-2xl
          `,

          userPreviewMainIdentifier:
            "text-slate-800",

          userPreviewSecondaryIdentifier:
            "text-slate-500",

          /* MODAL */
          modalContent: `
            bg-white/80
            backdrop-blur-2xl
            border
            border-white/50
            shadow-2xl
          `,
        },
      }}
    >

      <BrowserRouter>
        <App />
      </BrowserRouter>

    </ClerkProvider>

  </React.StrictMode>
);