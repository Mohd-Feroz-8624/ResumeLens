const express = require('express');
const multer = require('multer');

const router = express.Router();

// Configure multer for file uploads (store in memory for processing)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed.'));
    }
  },
});

// Keyword pools for realistic mock analysis
const KEYWORD_POOLS = {
  matched: [
    'Communication', 'Problem Solving', 'Teamwork', 'JavaScript', 'React',
    'Python', 'HTML', 'CSS', 'Git', 'REST APIs', 'SQL', 'Node.js',
    'Leadership', 'Collaboration', 'Analytical Thinking',
  ],
  missing: [
    'Docker', 'CI/CD', 'TypeScript', 'AWS', 'Agile', 'Kubernetes',
    'GraphQL', 'Redis', 'Terraform', 'Microservices', 'Testing',
    'System Design', 'Scrum', 'Data Structures',
  ],
};

// Pick N random items from an array
function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// Build suggestions based on the target role
function buildSuggestions(role) {
  return [
    `Add quantifiable achievements for ${role} (e.g., "reduced load time by 35%")`,
    'Use strong action verbs: built, led, optimized, shipped, designed',
    'Add a LinkedIn URL in your contact section',
    `Include certifications or courses relevant to ${role}`,
    'Keep resume to 1–2 pages; remove outdated or irrelevant roles',
    'Tailor your professional summary to the target job description',
    'Use industry-standard section headings for better ATS parsing',
  ];
}

// POST /api/analysis — Analyze a resume file
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a resume file.' });
    }

    const { role, experience } = req.body;

    if (!role || !role.trim()) {
      return res.status(400).json({ message: 'Please enter a target role.' });
    }

    // Generate a realistic mock ATS score (55–85 range)
    const score = Math.floor(55 + Math.random() * 31);

    // Pick random matched/missing keywords
    const matched = pickRandom(KEYWORD_POOLS.matched, 4 + Math.floor(Math.random() * 4));
    const missing = pickRandom(KEYWORD_POOLS.missing, 4 + Math.floor(Math.random() * 4));

    // Build suggestions
    const suggestions = buildSuggestions(role);

    res.json({
      score,
      matched,
      missing,
      suggestions,
      fileName: req.file.originalname,
      role,
      experience: experience || 'Not specified',
    });
  } catch (err) {
    console.error('Analysis error:', err.message);
    res.status(500).json({ message: 'Failed to analyze resume. Please try again.' });
  }
});

module.exports = router;
