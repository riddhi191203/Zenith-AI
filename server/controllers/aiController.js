import OpenAI from "openai";
import sql from "../configs/db.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

// ==============================
// GROQ CONFIG
// ==============================

const AI = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const removeLocalFile = async (filePath) => {
  if (!filePath) return;
  await fs.promises.unlink(filePath).catch(() => {});
};

const uploadImageBuffer = async (buffer, folder) => {
  const dataUri = `data:image/png;base64,${buffer.toString("base64")}`;
  return cloudinary.uploader.upload(dataUri, { folder });
};

const callClipdrop = async ({ endpoint, files, fields = {} }) => {
  if (!process.env.CLIPDROP_API_KEY) {
    throw new Error("CLIPDROP_API_KEY is not configured");
  }

  const formData = new FormData();

  for (const [fieldName, file] of Object.entries(files)) {
    const buffer = await fs.promises.readFile(file.path);
    const blob = new Blob([buffer], {
      type: file.mimetype || "application/octet-stream",
    });

    formData.append(fieldName, blob, file.originalname);
  }

  for (const [fieldName, value] of Object.entries(fields)) {
    formData.append(fieldName, value);
  }

  const response = await fetch(`https://clipdrop-api.co/${endpoint}`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.CLIPDROP_API_KEY,
      accept: "image/png",
    },
    body: formData,
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") || "";
    const errorBody = contentType.includes("application/json")
      ? await response.json()
      : { error: await response.text() };

    throw new Error(errorBody.error || "ClipDrop request failed");
  }

  return Buffer.from(await response.arrayBuffer());
};

// ==============================
// GENERATE ARTICLE
// ==============================

export const generateArticle = async (req, res) => {
  try {
    const userId = req.userId;

    const { prompt, length = 1200 } = req.body;

    const completion = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are an expert SEO article writer. Generate high-quality, engaging, professional articles with headings and formatting.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: length,
    });

    const content = completion.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GENERATE BLOG TITLES
// ==============================

export const generateBlogTitle = async (req, res) => {
  try {
    const userId = req.userId;

    const { prompt } = req.body;

    const completion = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "Generate 10 catchy blog titles in bullet format.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.8,
      max_tokens: 200,
    });

    const content = completion.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GENERATE IMAGE
// ==============================

export const generateImage = async (req, res) => {
  try {
    const userId = req.userId;

    const { prompt, publish = false } = req.body;

    // ENHANCED PROMPT
    const enhancedPrompt = `
      masterpiece,
      ultra detailed,
      cinematic lighting,
      realistic,
      8k,
      highly detailed,
      professional photography,
      ${prompt}
    `;

    // RANDOM SEED
    const seed = Math.floor(Math.random() * 100000);

    // POLLINATIONS IMAGE URL
    const imageUrl =
      `https://image.pollinations.ai/prompt/${encodeURIComponent(
        enhancedPrompt
      )}?seed=${seed}`;

    // UPLOAD TO CLOUDINARY
    const uploadResult = await cloudinary.uploader.upload(imageUrl);

    // SAVE TO DATABASE
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (
        ${userId},
        ${prompt},
        ${uploadResult.secure_url},
        'image',
        ${publish}
      )
    `;

    res.json({
      success: true,
      content: uploadResult.secure_url,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// REMOVE IMAGE BACKGROUND
// ==============================

export const removeImageBackground = async (req, res) => {
  const image = req.file;

  try {
    const userId = req.userId;

    if (!image) {
      return res.json({
        success: false,
        message: "No image uploaded",
      });
    }

    const outputBuffer = await callClipdrop({
      endpoint: "remove-background/v1",
      files: { image_file: image },
    });

    const uploadResult = await uploadImageBuffer(outputBuffer, "zenith-ai/background-removal");

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (
        ${userId},
        'Background removed',
        ${uploadResult.secure_url},
        'image'
      )
    `;

    res.json({
      success: true,
      content: uploadResult.secure_url,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    await removeLocalFile(image?.path);
  }
};

// ==============================
// RESUME REVIEW
// ==============================

export const resumeReview = async (req, res) => {
  const resume = req.file;

  try {
    const userId = req.userId;

    if (!resume) {
      return res.json({
        success: false,
        message: "No resume uploaded",
      });
    }

    // FILE SIZE LIMIT
    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds 5MB.",
      });
    }

    // READ PDF
    const dataBuffer = fs.readFileSync(resume.path);

    const pdfData = await pdf(dataBuffer);

    // AI PROMPT
    const prompt = `
Analyze this resume professionally.

Provide:

1. ATS Score (/100)
2. Strengths
3. Weaknesses
4. Missing Skills
5. Improvement Suggestions
6. Final Verdict

Resume Content:

${pdfData.text}
`;

    // AI ANALYSIS
    const completion = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.5,
      max_tokens: 1200,
    });

    const content = completion.choices[0].message.content;

    // SAVE TO DATABASE
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (
        ${userId},
        'Resume Review',
        ${content},
        'resume-review'
      )
    `;

    // DELETE LOCAL FILE
    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    await removeLocalFile(resume?.path);
  }
};
