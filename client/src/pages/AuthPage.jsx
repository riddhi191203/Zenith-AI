import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Eraser,
  FileText,
  ImageIcon,
  KeyRound,
  Lock,
  Mail,
  RotateCcw,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { useAuth } from "../context/auth";

const fieldClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pl-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

const modeCopy = {
  login: {
    title: "Welcome back",
    description: "Sign in to continue creating with Zenith AI.",
    button: "Sign in",
  },
  register: {
    title: "Create your account",
    description: "Start your AI workspace in a few seconds.",
    button: "Create account",
  },
  forgot: {
    title: "Reset your password",
    description: "Enter your email to generate a password reset token.",
    button: "Generate reset token",
  },
  reset: {
    title: "Set a new password",
    description: "Paste your reset token and choose a new password.",
    button: "Update password",
  },
};

const sidePanelCopy = {
  login: {
    eyebrow: "Zenith AI workspace",
    title: "Pick up where your last idea left off.",
    description:
      "Sign in to manage your articles, blog titles, generated images, image edits, resume reviews, and shared community creations in one place.",
  },
  register: {
    eyebrow: "Start creating",
    title: "Build your personal AI creation hub.",
    description:
      "Create a Zenith AI account to write content, generate visuals, polish images, review resumes, and save every result to your dashboard.",
  },
  forgot: {
    eyebrow: "Account recovery",
    title: "Get back to your Zenith AI tools.",
    description:
      "Reset your password and return to your saved drafts, generated assets, image edits, and resume feedback without losing your workspace.",
  },
  reset: {
    eyebrow: "Secure reset",
    title: "Set a new password for your AI workspace.",
    description:
      "Protect access to your Zenith AI dashboard, creations, publishing history, and community activity with a fresh password.",
  },
};

const workspaceHighlights = [
  { icon: FileText, label: "Write Articles", detail: "Generate structured long-form content" },
  { icon: Sparkles, label: "Name Blog Posts", detail: "Create catchy, searchable titles" },
  { icon: ImageIcon, label: "Generate Images", detail: "Turn prompts into shareable visuals" },
  { icon: Eraser, label: "Edit Images", detail: "Remove backgrounds and unwanted objects" },
];

const savedItems = [
  { type: "Draft", title: "AI article ready for the dashboard" },
  { type: "Image", title: "Background removed for a product shot" },
  { type: "Resume", title: "Review report with improvement tips" },
];

const AuthInput = ({ icon, ...props }) => (
  <label className="relative block">
    {React.createElement(icon, {
      className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400",
    })}
    <input className={fieldClass} {...props} />
  </label>
);

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get("token") ? "reset" : "login");
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    token: searchParams.get("token") || "",
  });
  const { forgotPassword, login, register, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const copy = modeCopy[mode];
  const sideCopy = sidePanelCopy[mode];
  const destination = location.state?.from || "/ai";

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setResetLink("");
  };

  const updateForm = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const resetUrl = useMemo(() => {
    if (!resetLink) return "";
    return `${window.location.origin}/login?token=${resetLink}`;
  }, [resetLink]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        const data = await login({ email: form.email, password: form.password });
        if (!data.success) return toast.error(data.message);
        toast.success("Welcome back");
        navigate(destination, { replace: true });
        return;
      }

      if (mode === "register") {
        const data = await register({
          name: form.name,
          email: form.email,
          password: form.password,
        });
        if (!data.success) return toast.error(data.message);
        toast.success("Account created");
        navigate(destination, { replace: true });
        return;
      }

      if (mode === "forgot") {
        const data = await forgotPassword({ email: form.email });
        if (!data.success) return toast.error(data.message);
        setResetLink(data.resetToken || "");
        toast.success("Reset token generated");
        return;
      }

      const data = await resetPassword({
        token: form.token,
        password: form.password,
      });
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      switchMode("login");
      setForm((current) => ({ ...current, password: "", token: "" }));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen overflow-hidden bg-slate-50 px-4 py-4 text-slate-900">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center">
      <Link to="/" className="mx-auto flex w-fit items-center gap-2 text-sm font-semibold text-blue-700">
        <Sparkles className="h-4 w-4" />
        Zenith AI
      </Link>

      <section className="mt-4 grid min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:max-h-[calc(100vh-5rem)] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="hidden overflow-hidden bg-slate-950 p-6 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-blue-300">
              {sideCopy.eyebrow}
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight">
              {sideCopy.title}
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              {sideCopy.description}
            </p>
          </div>

          <div className="my-5 grid grid-cols-2 gap-3">
            {workspaceHighlights.map(({ icon, label, detail }) => (
              <div key={label} className="rounded-xl bg-white/5 p-2.5">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300">
                  {React.createElement(icon, { className: "h-4 w-4" })}
                </div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-1 text-xs leading-4 text-slate-400">{detail}</p>
              </div>
            ))}
          </div>

          
        </aside>

        <div className="flex min-h-0 flex-col justify-center overflow-hidden p-5 sm:p-7">
          <div className="mb-5">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <KeyRound className="h-3.5 w-3.5" />
              Secure access
            </div>
            <h2 className="text-3xl font-bold">{copy.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{copy.description}</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-3.5">
            {mode === "register" && (
              <AuthInput
                icon={User}
                required
                value={form.name}
                onChange={updateForm("name")}
                placeholder="Full name"
              />
            )}

            {mode !== "reset" && (
              <AuthInput
                icon={Mail}
                required
                type="email"
                value={form.email}
                onChange={updateForm("email")}
                placeholder="Email address"
              />
            )}

            {mode === "reset" && (
              <AuthInput
                icon={RotateCcw}
                required
                value={form.token}
                onChange={updateForm("token")}
                placeholder="Reset token"
              />
            )}

            {mode !== "forgot" && (
              <AuthInput
                icon={Lock}
                required
                minLength={6}
                type="password"
                value={form.password}
                onChange={updateForm("password")}
                placeholder={mode === "reset" ? "New password" : "Password"}
              />
            )}

            {mode === "login" && (
              <button
                type="button"
                onClick={() => switchMode("forgot")}
                className="text-sm font-medium text-blue-700"
              >
                Forgot password?
              </button>
            )}

            <button
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? (
                <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  {copy.button}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {resetUrl && (
            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-900">Reset link</p>
              <p className="mt-1 break-all text-xs leading-5 text-blue-700">{resetUrl}</p>
              <button
                type="button"
                onClick={() => {
                  setForm((current) => ({ ...current, token: resetLink }));
                  switchMode("reset");
                }}
                className="mt-3 text-sm font-semibold text-blue-800"
              >
                Use this token
              </button>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
            {mode !== "login" && (
              <button type="button" onClick={() => switchMode("login")} className="font-medium text-blue-700">
                Back to sign in
              </button>
            )}
            {mode === "login" && (
              <button type="button" onClick={() => switchMode("register")} className="font-medium text-blue-700">
                Need an account? Sign up
              </button>
            )}
            {mode === "register" && (
              <button type="button" onClick={() => switchMode("login")} className="font-medium text-blue-700">
                Already have an account?
              </button>
            )}
          </div>
        </div>
      </section>
      </div>
    </main>
  );
};

export default AuthPage;
