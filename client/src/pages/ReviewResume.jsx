import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { FileText } from "lucide-react";
import {
  Field,
  MarkdownResult,
  ResultAction,
  ToolWorkspace,
  UploadBox,
} from "../components/ToolWorkspace";
import { copyToClipboard } from "../utils/toolWorkspace";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const handleFileChange = (file) => {
    if (!file) return;
    setInput(file);
    setFileName(file.name);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (!data.success) return toast.error(data.message);
      setContent(data.content);
      toast.success("Resume analyzed successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolWorkspace
      form={{
        title: "Resume Analyzer",
        description: "Get ATS, strengths, and improvement insights.",
        onSubmit: onSubmitHandler,
        loading,
        disabled: !input,
        submitLabel: "Analyze Resume",
        submitIcon: FileText,
        children: (
          <Field label="Upload Resume">
            <UploadBox
              accept="application/pdf"
              fileName={fileName}
              label="Upload Your Resume"
              hint="PDF only"
              onChange={handleFileChange}
            />
          </Field>
        ),
      }}
      result={{
        title: "Analysis Results",
        description: "AI-powered resume insights.",
        icon: FileText,
        content,
        emptyTitle: "No Resume Analysis Yet",
        emptyDescription: "Upload your resume to receive ATS and improvement feedback.",
        action: content && (
          <ResultAction
            onClick={async () => toast.success(await copyToClipboard(content, "Analysis copied"))}
          />
        ),
        children: <MarkdownResult badge="Analysis Completed">{content}</MarkdownResult>,
      }}
    />
  );
};

export default ReviewResume;
