import { useState } from "react";
import toast from "react-hot-toast";
import { ImageIcon, Scissors, Search } from "lucide-react";
import api from "../lib/api";
import {
  Field,
  ImageResult,
  ResultAction,
  ToolWorkspace,
  UploadBox,
} from "../components/ToolWorkspace";

const normalizeObjectName = (value) => value.trim().toLowerCase();
let objectDetectorPromise;

const loadObjectDetector = async () => {
  if (!objectDetectorPromise) {
    objectDetectorPromise = Promise.all([
      import("@tensorflow/tfjs"),
      import("@tensorflow-models/coco-ssd"),
    ]).then(([, cocoSsd]) => cocoSsd.load());
  }

  return objectDetectorPromise;
};

const buildImageElement = (file) =>
  new Promise((resolve, reject) => {
    const imageUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => resolve({ img, imageUrl });
    img.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Could not read the uploaded image"));
    };
    img.src = imageUrl;
  });

const createMaskFromDetection = async (file, objectName) => {
  const detector = await loadObjectDetector();
  const { img, imageUrl } = await buildImageElement(file);

  try {
    const detections = await detector.detect(img);
    const target = normalizeObjectName(objectName);
    const matches = detections.filter((item) => {
      const detectedClass = item.class.toLowerCase();
      return detectedClass === target || detectedClass.includes(target) || target.includes(detectedClass);
    });

    if (!matches.length) {
      throw new Error(`Could not find "${objectName}" in the image. Try a simpler object name like person, car, chair, bottle, or dog.`);
    }

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";

    matches.forEach(({ bbox }) => {
      const [x, y, width, height] = bbox;
      const paddingX = width * 0.16;
      const paddingY = height * 0.16;

      context.fillRect(
        Math.max(0, x - paddingX),
        Math.max(0, y - paddingY),
        Math.min(canvas.width, width + paddingX * 2),
        Math.min(canvas.height, height + paddingY * 2)
      );
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Could not prepare the object removal mask"));
          return;
        }

        resolve(new File([blob], "object-mask.png", { type: "image/png" }));
      }, "image/png");
    });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
};

const RemoveObject = () => {
  const [image, setImage] = useState(null);
  const [objectName, setObjectName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleImageChange = (file) => {
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanObjectName = objectName.trim();
      if (!image || !cleanObjectName) {
        return toast.error("Upload an image and enter the object to remove");
      }

      const generatedMask = await createMaskFromDetection(image, cleanObjectName);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("mask", generatedMask);
      formData.append("objectName", cleanObjectName);

      const { data } = await api.post("/api/ai/remove-image-object", formData);

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
        description: "Upload an image and name the object to erase.",
        onSubmit: onSubmitHandler,
        loading,
        disabled: !image || !objectName.trim(),
        submitLabel: "Remove Object",
        submitIcon: Scissors,
        children: (
          <>
            <Field label="Upload Image">
              <UploadBox
                accept="image/*"
                preview={imagePreview}
                label="Upload an Image"
                hint="JPG or PNG original image"
                onChange={handleImageChange}
              />
            </Field>

            <Field label="Object to Remove">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={objectName}
                  onChange={(event) => setObjectName(event.target.value)}
                  placeholder="Example: person, car, chair, bottle"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pl-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Use a simple visible object name for best detection.
              </p>
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
        emptyDescription: "Upload an image, type the object name, and Zenith AI will remove the detected object.",
        action: content && <ResultAction type="download" href={content} />,
        children: <ImageResult src={content} alt="Processed" badge="Object Removed" />,
      }}
    />
  );
};

export default RemoveObject;
