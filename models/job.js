const mongoose = require("mongoose");

const JobScheme = mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ["py", "c"],
  },
  filePath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now(),
  },
  startedAt: {
    type: Date,
  },
  complatedAt: {
    type: Date,
  },
  output: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["success", "error", "pending"],
  },
});
const Job = new mongoose.model("job", JobScheme);

module.exports = Job;
