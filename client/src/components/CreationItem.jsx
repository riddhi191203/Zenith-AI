import { useState } from "react";
import Markdown from "react-markdown";
import { ChevronDown, Sparkles } from "lucide-react";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200"
    >
      <div className="flex items-start justify-between gap-4 p-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-blue-600">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0">
            <h2 className="line-clamp-2 text-base font-semibold text-slate-800">
              {item.prompt}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {item.type} - {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium capitalize text-blue-700">
            {item.type}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-slate-500 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all ${
          expanded ? "max-h-[1200px] px-4 pb-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {item.type === "image" ? (
          <img
            src={item.content}
            alt="Generated"
            className="mt-3 max-h-[420px] w-full rounded-xl border border-slate-200 object-contain"
          />
        ) : (
          <div className="prose prose-slate mt-3 max-h-[420px] max-w-none overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Markdown>{item.content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreationItem;
