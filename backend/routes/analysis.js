const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const router = express.Router();

// Configure multer for file uploads (store in memory for processing)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed."));
    }
  },
});

// Category technical keyword lists (all lowercase for matching)
const ROLE_KEYWORDS = {
  frontend: [
    "javascript",
    "react",
    "html",
    "css",
    "typescript",
    "redux",
    "webpack",
    "vite",
    "tailwind",
    "ui/ux",
    "rest api",
    "next.js",
    "vue",
    "angular",
    "sass",
    "responsive",
  ],
  backend: [
    "node.js",
    "express",
    "python",
    "django",
    "sql",
    "postgresql",
    "mongodb",
    "rest api",
    "redis",
    "docker",
    "microservices",
    "java",
    "spring",
    "go",
    "graphql",
    "mysql",
  ],
  data: [
    "python",
    "sql",
    "excel",
    "tableau",
    "powerbi",
    "pandas",
    "numpy",
    "statistics",
    "data visualization",
    "r",
    "machine learning",
    "analytics",
    "dashboard",
    "database",
  ],
  devops: [
    "docker",
    "kubernetes",
    "aws",
    "ci/cd",
    "terraform",
    "linux",
    "git",
    "jenkins",
    "ansible",
    "shell scripting",
    "monitoring",
    "azure",
    "gcp",
    "cloud",
  ],
  product: [
    "agile",
    "scrum",
    "roadmap",
    "market research",
    "user stories",
    "analytics",
    "jira",
    "product design",
    "strategy",
    "metrics",
    "backlog",
    "stakeholder",
  ],
  general: [
    "communication",
    "problem solving",
    "teamwork",
    "leadership",
    "collaboration",
    "analytical thinking",
    "management",
    "git",
    "agile",
    "project management",
  ],
};

// Map target role input to keywords category
function getCategoryForRole(role) {
  const r = role.toLowerCase();
  if (r.includes("front")) return "frontend";
  if (r.includes("back") || r.includes("api") || r.includes("server"))
    return "backend";
  if (r.includes("data") || r.includes("analy") || r.includes("science"))
    return "data";
  if (
    r.includes("devops") ||
    r.includes("infra") ||
    r.includes("cloud") ||
    r.includes("system")
  )
    return "devops";
  if (r.includes("product") || r.includes("project") || r.includes("manager"))
    return "product";
  return "general";
}

// Text extraction utility
async function extractText(fileBuffer, mimeType) {
  try {
    if (mimeType === "application/pdf") {
      const data = await pdfParse(fileBuffer);
      return data.text || "";
    } else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const {value} = await mammoth.extractRawText({ buffer: fileBuffer });
      return value || "";
    } else if (mimeType === "application/msword") {
      // Fallback for older doc binary files: strip out non-ascii readable text
      return fileBuffer.toString("utf8").replace(/[^\x20-\x7E\s]/g, "");
    }
    return "";
  } catch (error) {
    console.error("Text extraction error:", error.message);
    throw new Error(
      `unsupported file type or corrupted file. Please upload a valid PDF, DOC, or DOCX file.`,
    );
  }
}


// POST /api/analysis — Analyze a resume file
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume file." });
    }

    const { role, experience } = req.body;

    if (!role || !role.trim()) {
      return res.status(400).json({ message: "Please enter a target role." });
    }

    if (!req.file.buffer || req.file.buffer.length === 0) {
      return res
        .status(400)
        .json({ message: "File buffer is empty. Please upload a valid file." });
    }

    // Extract text content from the file
    let textContent = "";
    try {
      textContent = await extractText(req.file.buffer, req.file.mimetype);
    } catch (extractError) {
      console.error("File extraction failed:", extractError.message);
      return res.status(400).json({
        message:
          "Unable to read your file. Please ensure it is a valid PDF, DOC, or DOCX file.",
      });
    }

    if (!textContent || textContent.trim().length === 0) {
      return res.status(400).json({
        message:
          "Could not extract text from the file. Please check if the file is valid and contains text.",
      });
    }

    const normalizedText = textContent.toLowerCase();

    // Determine target keywords based on role
    const category = getCategoryForRole(role);
    const technicalKeywords = ROLE_KEYWORDS[category];
    const generalKeywords = ROLE_KEYWORDS.general;

    // Combine keywords to scan (deduplicate)
    const combinedKeywords = [
      ...new Set([...technicalKeywords, ...generalKeywords]),
    ];

    const matched = [];
    const missing = [];

    combinedKeywords.forEach((kw) => {
      // Look for keyword in text (both substring and simple boundaries)
      const escaped = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "i");
      const hasMatch =
        regex.test(normalizedText) || normalizedText.includes(kw);

      const displayWord = kw
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      if (hasMatch) {
        matched.push(displayWord);
      } else {
        missing.push(displayWord);
      }
    });

    // Score Calculations
    // 1. Keyword match score (60% max weight)
    const keywordWeight = 60;
    const matchRatio =
      combinedKeywords.length > 0
        ? matched.length / combinedKeywords.length
        : 1;
    const keywordScore = matchRatio * keywordWeight;

    // 2. Sections check (20% max weight)
    const SECTION_PATTERNS = {
      Education: /\b(education|academic|studies|university|college|school)\b/i,
      Experience:
        /\b(experience|employment|work history|professional background|career|history)\b/i,
      Skills:
        /\b(skills|technologies|proficiencies|expertise|technical skill)\b/i,
      Projects: /\b(projects|personal projects|portfolio|key work)\b/i,
      Summary: /\b(summary|objective|professional profile|about me)\b/i,
    };

    let sectionScore = 0;
    const missingSections = [];
    Object.entries(SECTION_PATTERNS).forEach(([section, pattern]) => {
      if (pattern.test(normalizedText)) {
        sectionScore += 4; // 5 sections * 4 points = 20 points max
      } else {
        missingSections.push(section);
      }
    });

    // 3. Contact info check (20% max weight)
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phonePattern = /(\+?\d{1,4}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/;
    const linkedinPattern = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i;

    let contactScore = 0;
    const missingContact = [];

    if (emailPattern.test(normalizedText)) contactScore += 10;
    else missingContact.push("Email address");

    if (phonePattern.test(normalizedText)) contactScore +=10;
    else missingContact.push("Phone number");

    if (linkedinPattern.test(normalizedText)) contactScore += 8;
    else missingContact.push("LinkedIn profile URL");

    // Calculate overall ATS Score (capped at 100)
    let score = Math.round(keywordScore + sectionScore + contactScore);
    if (score < 40 && textContent.trim().length > 50) {
      score = 40; // baseline score for readable text
    }
    if (score > 98) score = 98; // leave some room for optimization

    // Build smart improvement suggestions
    const suggestions = [];

    // Category specific suggestions
    if (missing.length > 0) {
      const topMissing = missing.slice(0, 3).join(", ");
      suggestions.push(
        `Include target industry keywords like: ${topMissing} to better align with ${role} requirements.`,
      );
    }

    // Layout/Sections suggestions
    missingSections.forEach((sec) => {
      suggestions.push(
        `Add a distinct "${sec}" section heading to structure your achievements clearly.`,
      );
    });

    // Contact info suggestions
    missingContact.forEach((item) => {
      suggestions.push(
        `Provide your ${item} in the contact header to help recruiters reach you.`,
      );
    });

    // Experience/Writing optimization suggestions
    if (experience && parseInt(experience, 10) > 0) {
      suggestions.push(
        'Quantify experience impact with concrete metrics (e.g., "led team of 4", "scaled throughput by 30%").',
      );
    }
    suggestions.push(
      "Use active verb phrases like: built, designed, optimized, shipped, and led to describe achievements.",
    );
    suggestions.push(
      "Keep formatting clean and ensure sections are easily identifiable for automated parsing.",
    );

    res.json({
      score,
      matched,
      missing,
      suggestions: suggestions.slice(0, 7), // return top suggestions
      fileName: req.file.originalname,
      role,
      experience: experience || "Not specified",
    });
  } catch (err) {
    console.error("Analysis error:", err.message);
    console.error("Full error:", err);
    res.status(500).json({
      message: "Failed to analyze resume. Please try again.",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

module.exports = router;
