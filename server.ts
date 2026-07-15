import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { generateDynamicMockSheet } from "./src/mockData";
import { GenerationRequest, GenerationResponse, PracticalSheet } from "./src/types";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK if available
const apiKey = process.env.GEMINI_API_KEY;
const isApiKeyValid = apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "";

let ai: GoogleGenAI | null = null;
if (isApiKeyValid) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini API:", err);
  }
} else {
  console.log("No valid Gemini API key found. Using Mock AI service by default.");
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiActive: !!ai });
});

app.post("/api/generate", async (req, res) => {
  const { topic, language, difficulty = 'Intermediate', customAim = '', useMock = false } = req.body as GenerationRequest;

  if (!topic || !language) {
    return res.status(400).json({
      success: false,
      error: "Topic and Language are required fields.",
      isMocked: true
    });
  }

  // 1. Force Mock if requested or if Gemini is not initialized
  if (useMock || !ai) {
    try {
      const sheet = generateDynamicMockSheet(topic, language, difficulty, customAim);
      return res.json({
        success: true,
        sheet,
        isMocked: true
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: `Mock generation failed: ${err.message}`,
        isMocked: true
      });
    }
  }

  // 2. Real Gemini Generation
  try {
    console.log(`Generating practical sheet via Gemini for: ${topic} in ${language}`);
    const prompt = `You are an expert college computer science professor and practical lab examiner. 
Generate a comprehensive, high-quality practical sheet on the topic "${topic}" using the programming language "${language}".
The target difficulty level is "${difficulty}".
${customAim ? `The custom aim is: "${customAim}".` : ""}

Respond with a strictly formatted JSON object matching the following TypeScript schema:
{
  "title": "A precise, specific, and professional name of the practical (e.g. 'Binary Search Implementation' or 'Matrix Multiplication using Pointers')",
  "aim": "A formal academic Aim statement starting with 'To implement...', 'To design...', or 'To write a program to...'",
  "algorithm": [
    "Step-by-step algorithmic procedure. Give a detailed multi-step layout of how the code runs.",
    "Each item in this array should be a single logical step."
  ],
  "sourceCode": "A completely working, clean, well-commented code snippet. No truncated code. Must handle all edge cases correctly.",
  "expectedOutput": "The exact console text that is printed when running this source code. Make it look professional and neat."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Professional title for this practical sheet" },
            aim: { type: Type.STRING, description: "Formal laboratory practical aim" },
            algorithm: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Sequence of numbered or standard steps to achieve the goal"
            },
            sourceCode: { type: Type.STRING, description: "Fully working code sample with comments" },
            expectedOutput: { type: Type.STRING, description: "Exactly what printing this code to standard output yields" }
          },
          required: ["title", "aim", "algorithm", "sourceCode", "expectedOutput"]
        },
        temperature: 0.2,
      }
    });

    const jsonText = response.text ? response.text.trim() : "";
    if (!jsonText) {
      throw new Error("Received empty text response from Gemini");
    }

    const parsed = JSON.parse(jsonText);
    const sheet: PracticalSheet = {
      id: `sheet_${Math.random().toString(36).substring(2, 9)}`,
      topic,
      language,
      title: parsed.title || `${topic} Practical`,
      aim: parsed.aim || `To write a program to demonstrate ${topic}`,
      algorithm: parsed.algorithm || ["Start.", "Perform operation.", "End."],
      sourceCode: parsed.sourceCode || "",
      expectedOutput: parsed.expectedOutput || "",
      difficulty,
      created_at: new Date().toISOString()
    };

    return res.json({
      success: true,
      sheet,
      isMocked: false
    });

  } catch (err: any) {
    console.error("Gemini generation failed, falling back to dynamic mock generator:", err);
    // Graceful fallback to Mock Generator
    try {
      const sheet = generateDynamicMockSheet(topic, language, difficulty, customAim);
      return res.json({
        success: true,
        sheet,
        isMocked: true,
        warning: "Gemini API request failed or was rate limited; dynamically generated a precise lab sheet fallback."
      });
    } catch (fallbackErr: any) {
      return res.status(500).json({
        success: false,
        error: `Both Gemini and fallback generator failed: ${err.message}`,
        isMocked: true
      });
    }
  }
});

// Configure Vite middleware and start
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
