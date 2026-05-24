import { useState } from "react";
import toast from "react-hot-toast";
import { Eraser, ImageIcon } from "lucide-react";
import api from "../lib/api";
import {
  Field,
  ImageResult,
  ResultAction,
  ToolWorkspace,
  UploadBox,
} from "../components/ToolWorkspace";

const RemoveBackground = () => {
  const [input, setInput] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleImageChange = (file) => {
    if (!file) return;
    setInput(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", input);

      const { data } = await api.post("/api/ai/remove-image-background", formData);

      if (!data.success) return toast.error(data.message);
      setContent(data.content);
      toast.success("Background removed successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolWorkspace
      form={{
        title: "Background Remover",
        description: "Remove image backgrounds using AI.",
        onSubmit: onSubmitHandler,
        loading,
        disabled: !input,
        submitLabel: "Remove Background",
        submitIcon: Eraser,
        children: (
          <Field label="Upload Your Image">
            <UploadBox
              accept="image/*"
              preview={preview}
              label="Upload an Image"
              hint="JPG, PNG, and WEBP supported"
              onChange={handleImageChange}
            />
          </Field>
        ),
      }}
      result={{
        title: "Processed Image",
        description: "Background removed with AI.",
        icon: ImageIcon,
        emptyIcon: Eraser,
        content,
        emptyTitle: "No Processed Image Yet",
        emptyDescription: "Upload an image and Zenith AI will remove the background.",
        action: content && <ResultAction type="download" href={content} />,
        children: (
          <ImageResult
            src={content}
            alt="Processed"
            badge="Background Removed"
            transparent
          />
        ),
      }}
    />
  );
};

export default RemoveBackground;
