import React from "react";
import Markdown from "react-markdown";
import { Check, Copy, Download, Sparkles, Upload, Wand2 } from "lucide-react";

const panelClass =
  "min-h-0 rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur-xl";

export function ToolWorkspace({ form, result }) {
  const EmptyIcon = result.emptyIcon || result.icon;
  const ResultIcon = result.icon;

  return (
    <section className="h-full overflow-hidden bg-slate-50 p-4 lg:p-6">
      <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={form.onSubmit} className={`${panelClass} overflow-y-auto`}>
          <PanelHeader
            icon={Sparkles}
            title={form.title}
            description={form.description}
          />

          <div className="mt-5 space-y-5">{form.children}</div>

          <button
            disabled={form.loading || form.disabled}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {form.loading ? (
              <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                {form.submitIcon ? (
                  React.createElement(form.submitIcon, { className: "h-4 w-4" })
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                {form.submitLabel}
              </>
            )}
          </button>
        </form>

        <div className={`${panelClass} flex flex-col overflow-hidden`}>
          <PanelHeader
            icon={ResultIcon}
            title={result.title}
            description={result.description}
            action={result.action}
          />

          {!result.content ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <EmptyIcon className="h-9 w-9" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-slate-800">
                {result.emptyTitle}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {result.emptyDescription}
              </p>
            </div>
          ) : (
            <div className="mt-5 min-h-0 flex-1">{result.children}</div>
          )}
        </div>
      </div>
    </section>
  );
}

export function PanelHeader({ icon: Icon, title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
          {React.createElement(Icon, { className: "h-5 w-5" })}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export function OptionGroup({ options, value, onChange, getKey = (item) => item }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => {
        const key = getKey(item);
        const selected = key === value;

        return (
          <button
            type="button"
            key={key}
            onClick={() => onChange(item)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              selected
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50"
            }`}
          >
            {item.text || item}
            {item.desc && (
              <span className={selected ? "ml-2 text-white/75" : "ml-2 text-slate-400"}>
                {item.desc}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function ToggleRow({ checked, onChange, icon: Icon, title, description }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 bg-blue-50/50 p-4">
      <span className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
          {React.createElement(Icon, { className: "h-5 w-5" })}
        </span>
        <span>
          <span className="block text-sm font-semibold text-slate-800">{title}</span>
          <span className="block text-xs text-slate-500">{description}</span>
        </span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-blue-600"
      />
    </label>
  );
}

export function UploadBox({ accept, preview, fileName, label, hint, onChange }) {
  return (
    <label className="flex min-h-56 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 transition hover:bg-blue-50">
      <input
        type="file"
        accept={accept}
        hidden
        required
        onChange={(e) => onChange(e.target.files[0])}
      />
      {preview ? (
        <img src={preview} alt="Preview" className="h-64 w-full object-cover" />
      ) : (
        <div className="p-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-600">
            <Upload className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-800">{fileName || label}</h3>
          <p className="mt-2 text-sm text-slate-500">{hint}</p>
        </div>
      )}
    </label>
  );
}

export function ResultAction({ type = "copy", onClick, href, copied }) {
  const Icon = type === "download" ? Download : copied ? Check : Copy;
  const label = type === "download" ? "Download" : copied ? "Copied" : "Copy";
  const className =
    "shrink-0 inline-flex h-10 items-center gap-2 rounded-xl bg-blue-50 px-3 text-sm font-medium text-blue-700 transition hover:bg-blue-100";

  return type === "download" ? (
    <a href={href} download className={className}>
      <Icon className="h-4 w-4" />
      {label}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export function MarkdownResult({ children, badge }) {
  return (
    <div className="h-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5">
      {badge && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
          <Check className="h-4 w-4" />
          {badge}
        </div>
      )}
      <div className="prose prose-slate max-w-none">
        <Markdown>{children}</Markdown>
      </div>
    </div>
  );
}

export function ImageResult({ src, alt, badge, transparent = false }) {
  return (
    <div className="flex h-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-3">
      <div
        className={`relative max-h-full max-w-full overflow-hidden rounded-xl ${
          transparent ? "bg-slate-100" : "bg-white"
        }`}
      >
        <img src={src} alt={alt} className="max-h-[calc(100vh-15rem)] w-full object-contain" />
        {badge && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-sm font-medium text-white">
            <Check className="h-4 w-4" />
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}
