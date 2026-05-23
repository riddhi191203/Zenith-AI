export const toolOptions = {
  articleLengths: [
    { length: 800, text: "Short", desc: "500 - 800 words" },
    { length: 1200, text: "Medium", desc: "800 - 1200 words" },
    { length: 1600, text: "Long", desc: "1200+ words" },
  ],
  blogCategories: [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ],
  imageStyles: [
    "Realistic",
    "Ghibli Style",
    "Anime Style",
    "Cartoon Style",
    "Fantasy Style",
    "3D Style",
    "Portrait Style",
    "Cyberpunk",
    "Cinematic",
  ],
};

export const copyToClipboard = async (value, success = "Copied to clipboard") => {
  await navigator.clipboard.writeText(value);
  return success;
};

export const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100";
