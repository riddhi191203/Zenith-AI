import { useState } from "react";
import toast from "react-hot-toast";
import { Edit, PenTool } from "lucide-react";
import api from "../lib/api";
import {
  Field,
  MarkdownResult,
  OptionGroup,
  ResultAction,
  ToolWorkspace,
} from "../components/ToolWorkspace";
import { copyToClipboard, inputClass, toolOptions } from "../utils/toolWorkspace";

const WriteArticle = () => {
  const [selectedLength, setSelectedLength] = useState(toolOptions.articleLengths[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = `Write a professional, engaging, SEO-friendly article about:
${input}

Requirements:
- Use headings and subheadings
- Include introduction and conclusion
- Make content easy to read
- Use markdown formatting
- Article length: ${selectedLength.desc}`;

      const { data } = await api.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length }
      );

      if (!data.success) return toast.error(data.message);
      setContent(data.content);
      toast.success("Article generated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolWorkspace
      form={{
        title: "AI Article Writer",
        description: "Generate professional long-form articles.",
        onSubmit: onSubmitHandler,
        loading,
        submitLabel: "Generate Article",
        submitIcon: PenTool,
        children: (
          <>
            <Field label="Article Topic">
              <textarea
                rows={4}
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="The future of artificial intelligence in healthcare"
                className={`${inputClass} resize-none`}
              />
            </Field>

            <Field label="Article Length">
              <OptionGroup
                options={toolOptions.articleLengths}
                value={selectedLength.text}
                onChange={setSelectedLength}
                getKey={(item) => item.text}
              />
            </Field>
          </>
        ),
      }}
      result={{
        title: "Generated Article",
        description: "Markdown output ready to copy.",
        icon: Edit,
        content,
        emptyTitle: "No Article Generated Yet",
        emptyDescription: "Enter a topic and let Zenith AI generate a polished article.",
        action: content && (
          <ResultAction
            onClick={async () => toast.success(await copyToClipboard(content, "Article copied"))}
          />
        ),
        children: <MarkdownResult badge="Article Generated Successfully">{content}</MarkdownResult>,
      }}
    />
  );
};

export default WriteArticle;
