const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// POST /api/contact — Submit a contact message (no auth required)
router.post('/', async (req, res) => {
  try {
    const { name, subject, message } = req.body;

    if (!name || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    await Contact.create({ name, subject, message });

    res.status(201).json({ message: 'Message sent successfully. We will get back to you soon!' });
  } catch (err) {
    console.error('Contact error:', err.message);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;
