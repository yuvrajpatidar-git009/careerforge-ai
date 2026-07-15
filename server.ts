import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client lazily or safely
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      aiClient = new GoogleGenAI({
        apiKey: apiKey || "MOCK_KEY",
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API Route for AI Generation
  app.post("/api/ai/generate", async (req: Request, res: Response) => {
    try {
      const { toolType, payload } = req.body;
      const ai = getGeminiClient();

      if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({
          error: "Gemini API key is not configured in Secrets settings. Please configure GEMINI_API_KEY under Settings > Secrets in the AI Studio UI to enable this AI generation tool.",
        });
      }

      let systemInstruction = "";
      let prompt = "";

      switch (toolType) {
        case "resume":
          systemInstruction = "You are an expert ATS resume writer and executive career coach. Generate a professional, highly polished, ATS-optimized resume in clean Markdown format based on the user's details. Organize with clear headers: Professional Summary, Key Skills, Work Experience (with bullet points starting with strong action verbs), Education, and Projects. Use clear, realistic descriptions with zero boilerplate statements.";
          prompt = `Create a professional resume for:\nName: ${payload.name}\nTarget Role: ${payload.role}\nSkills: ${payload.skills}\nExperience: ${payload.experience}\nEducation: ${payload.education}`;
          break;
        case "portfolio":
          systemInstruction = "You are a creative UI/UX designer and web developer. Generate an impressive portfolio architecture and copy guide in clear Markdown format. Provide layout sections, interactive component suggestions, and captivating self-introduction copy tailored to the user's profile and projects.";
          prompt = `Design a developer portfolio architecture for:\nName: ${payload.name}\nTitle: ${payload.title}\nAbout: ${payload.about}\nFeatured Projects: ${payload.projects}\nPrimary Tech Stack: ${payload.techStack}`;
          break;
        case "linkedin":
          systemInstruction = "You are a high-level corporate headhunter and personal branding expert. Optimize the user's LinkedIn profile. Generate a compelling, hook-driven 'About' summary, advice on writing an attention-grabbing Headline, and templates for job descriptions that stand out. Format the output with clear sections in Markdown.";
          prompt = `Optimize LinkedIn presence for:\nName: ${payload.name}\nCurrent Role: ${payload.currentRole}\nTarget Industry: ${payload.targetIndustry}\nCore Accomplishments: ${payload.accomplishments}\nInterests/Style: ${payload.style}`;
          break;
        case "readme":
          systemInstruction = "You are a senior software architect and open-source advocate. Generate a production-grade, comprehensive, and beautiful GitHub repository README.md. Use badges, clear install instructions, usage code blocks, and professional architecture descriptions. Format in clean, elegant Markdown.";
          prompt = `Generate a README.md for:\nProject Name: ${payload.projectName}\nDescription: ${payload.description}\nTech Stack: ${payload.techStack}\nKey Features: ${payload.features}\nInstallation & Usage: ${payload.installation}`;
          break;
        case "coverletter":
          systemInstruction = "You are a persuasive executive copywriter and recruiter. Write a tailored, high-impact Cover Letter in professional business letter format. Ensure a powerful opening, a persuasive middle detailing why the applicant is a perfect fit, and a proactive call to action closing. Output in Markdown format.";
          prompt = `Write a Cover Letter for:\nApplicant: ${payload.name}\nTarget Role: ${payload.role}\nCompany: ${payload.company}\nJob Description Key Requirements: ${payload.jobRequirements}\nMy Relevant Experience/Skills: ${payload.relevantExperience}`;
          break;
        default:
          return res.status(400).json({ error: "Invalid tool type requested." });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash", 
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || "No response received from Gemini.";
      res.json({ result: text });
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred during generation." });
    }
  });

  // Serve static or Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite"); 
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
