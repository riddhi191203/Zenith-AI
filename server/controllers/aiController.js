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

// ==============================
// GENERATE ARTICLE
// ==============================

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();

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
    const { userId } = req.auth();

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
    const { userId } = req.auth();

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
  try {
    const { userId } = req.auth();

    const image = req.file;

    if (!image) {
      return res.json({
        success: false,
        message: "No image uploaded",
      });
    }

    // UPLOAD ORIGINAL IMAGE
    const uploadResult = await cloudinary.uploader.upload(image.path);

    // REMOVE BACKGROUND
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      transformation: [
        {
          effect: "background_removal",
        },
      ],
    });

    // SAVE TO DATABASE
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (
        ${userId},
        'Background removed',
        ${transformedUrl},
        'image'
      )
    `;

    // DELETE LOCAL FILE
    fs.unlinkSync(image.path);

    res.json({
      success: true,
      content: transformedUrl,
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
// REMOVE OBJECT FROM IMAGE
// ==============================

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();

    const image = req.file;

    const { object } = req.body;

    if (!image) {
      return res.json({
        success: false,
        message: "No image uploaded",
      });
    }

    // UPLOAD IMAGE
    const uploadResult = await cloudinary.uploader.upload(image.path);

    // REMOVE OBJECT
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
    });

    // SAVE TO DATABASE
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (
        ${userId},
        ${`Removed ${object} from image`},
        ${transformedUrl},
        'image'
      )
    `;

    // DELETE LOCAL FILE
    fs.unlinkSync(image.path);

    res.json({
      success: true,
      content: transformedUrl,
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
// RESUME REVIEW
// ==============================

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();

    const resume = req.file;

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
    fs.unlinkSync(resume.path);

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