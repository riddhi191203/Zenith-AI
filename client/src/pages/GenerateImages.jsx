import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { Globe, ImageIcon } from "lucide-react";
import {
  Field,
  ImageResult,
  OptionGroup,
  ResultAction,
  ToggleRow,
  ToolWorkspace,
} from "../components/ToolWorkspace";
import { toolOptions } from "../utils/toolWorkspace";
import { inputClass } from "../utils/toolWorkspace";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = `Generate a high-quality ${selectedStyle} image of: ${input}. Ultra detailed, cinematic lighting, 4k, professional quality, masterpiece.`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (!data.success) return toast.error(data.message);
      setContent(data.content);
      toast.success("Image generated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolWorkspace
      form={{
        title: "AI Image Generator",
        description: "Create AI visuals from a prompt.",
        onSubmit: onSubmitHandler,
        loading,
        submitLabel: "Generate Image",
        children: (
          <>
            <Field label="Describe Your Image">
              <textarea
                rows={4}
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Futuristic cyberpunk city at night with neon lights"
                className={`${inputClass} resize-none`}
              />
            </Field>

            <Field label="Style">
              <OptionGroup
                options={toolOptions.imageStyles}
                value={selectedStyle}
                onChange={setSelectedStyle}
              />
            </Field>

            <ToggleRow
              checked={publish}
              onChange={setPublish}
              icon={Globe}
              title="Publish to Community"
              description="Make this image visible publicly"
            />
          </>
        ),
      }}
      result={{
        title: "Generated Image",
        description: "Your AI-generated visual.",
        icon: ImageIcon,
        content,
        emptyTitle: "No Image Generated Yet",
        emptyDescription: "Describe your idea and Zenith AI will turn it into a visual.",
        action: content && <ResultAction type="download" href={content} />,
        children: <ImageResult src={content} alt="Generated" badge="AI Generated" />,
      }}
    />
  );
};

export default GenerateImages;
