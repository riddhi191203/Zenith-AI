import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { ImageIcon, Scissors } from "lucide-react";
import {
  Field,
  ImageResult,
  ResultAction,
  ToolWorkspace,
  UploadBox,
} from "../components/ToolWorkspace";
import { inputClass } from "../utils/toolWorkspace";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState(null);
  const [preview, setPreview] = useState("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const handleImageChange = (file) => {
    if (!file) return;
    setInput(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (object.trim().split(/\s+/).length > 1) {
      return toast("Please enter only one object name");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);

      const { data } = await axios.post("/api/ai/remove-image-object", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (!data.success) return toast.error(data.message);
      setContent(data.content);
      toast.success("Object removed successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolWorkspace
      form={{
        title: "Object Remover",
        description: "Remove unwanted objects from images.",
        onSubmit: onSubmitHandler,
        loading,
        disabled: !input || !object,
        submitLabel: "Remove Object",
        submitIcon: Scissors,
        children: (
          <>
            <Field label="Upload Image">
              <UploadBox
                accept="image/*"
                preview={preview}
                label="Upload an Image"
                hint="Select an image to edit"
                onChange={handleImageChange}
              />
            </Field>

            <Field label="Object Name">
              <input
                required
                value={object}
                onChange={(e) => setObject(e.target.value)}
                placeholder="watch"
                className={inputClass}
              />
            </Field>
          </>
        ),
      }}
      result={{
        title: "Processed Image",
        description: "AI-edited image preview.",
        icon: ImageIcon,
        emptyIcon: Scissors,
        content,
        emptyTitle: "No Edited Image Yet",
        emptyDescription: "Upload an image and name the object you want removed.",
        action: content && <ResultAction type="download" href={content} />,
        children: <ImageResult src={content} alt="Processed" badge="Object Removed" />,
      }}
    />
  );
};

export default RemoveObject;
