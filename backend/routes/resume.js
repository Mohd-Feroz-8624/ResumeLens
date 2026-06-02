const express = require('express');
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');

const router = express.Router();

// POST /api/resumes — Create a new resume
router.post('/', auth, async (req, res) => {
  try {
    const { name, template, data } = req.body;

    const resume = await Resume.create({
      userId: req.user.id,
      name: name || 'Untitled Resume',
      template: template || 'Classic',
      data: data || {},
      savedAt: new Date(),
    });

    res.status(201).json({
      message: 'Resume saved successfully.',
      resume: {
        id: resume._id,
        name: resume.name,
        template: resume.template,
        data: resume.data,
        savedAt: resume.savedAt,
      },
    });
  } catch (err) {
    console.error('Save resume error:', err.message);
    res.status(500).json({ message: 'Failed to save resume.' });
  }
});

// GET /api/resumes — Get all resumes for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .sort({ savedAt: -1 })
      .lean();

    // Map _id to id for frontend compatibility
    const mapped = resumes.map((r) => ({
      id: r._id,
      name: r.name,
      template: r.template,
      data: r.data,
      savedAt: r.savedAt,
    }));

    res.json({ resumes: mapped });
  } catch (err) {
    console.error('Get resumes error:', err.message);
    res.status(500).json({ message: 'Failed to fetch resumes.' });
  }
});

// DELETE /api/resumes/:id — Delete a resume
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found.' });
    }

    res.json({ message: 'Resume deleted successfully.' });
  } catch (err) {
    console.error('Delete resume error:', err.message);
    res.status(500).json({ message: 'Failed to delete resume.' });
  }
});

module.exports = router;
