const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      default: 'Untitled Resume',
      trim: true,
    },
    template: {
      type: String,
      default: 'Classic',
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
