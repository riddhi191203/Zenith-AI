import { useState } from "react";
import toast from "react-hot-toast";
import { Hash } from "lucide-react";
import api from "../lib/api";
import {
  Field,
  MarkdownResult,
  OptionGroup,
  ResultAction,
  ToolWorkspace,
} from "../components/ToolWorkspace";
import { copyToClipboard, inputClass, toolOptions } from "../utils/toolWorkspace";

const BlogTitles = () => {
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = `Generate 10 highly engaging, SEO-friendly blog titles for the topic "${input}" in the category "${selectedCategory}". Make titles modern, clickable, and creative.`;
      const { data } = await api.post(
        "/api/ai/generate-blog-title",
        { prompt }
      );

      if (!data.success) return toast.error(data.message);
      setContent(data.content);
      toast.success("Titles generated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyContent = async () => {
    toast.success(await copyToClipboard(content));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolWorkspace
      form={{
        title: "AI Blog Title Generator",
        description: "Create clickable SEO title ideas.",
        onSubmit: onSubmitHandler,
        loading,
        submitLabel: "Generate Titles",
        children: (
          <>
            <Field label="Topic / Keyword">
              <input
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Future of artificial intelligence"
                className={inputClass}
              />
            </Field>

            <Field label="Category">
              <OptionGroup
                options={toolOptions.blogCategories}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </Field>
          </>
        ),
      }}
      result={{
        title: "Generated Titles",
        description: "AI-powered title suggestions.",
        icon: Hash,
        content,
        emptyTitle: "No Titles Generated Yet",
        emptyDescription: "Enter a topic, choose a category, and generate title ideas.",
        action: content && <ResultAction copied={copied} onClick={copyContent} />,
        children: <MarkdownResult>{content}</MarkdownResult>,
      }}
    />
  );
};

export default BlogTitles;
