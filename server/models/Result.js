const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  username: String,
  quizId: String,
  score: Number,
  total: Number
});

module.exports = mongoose.model("Result", resultSchema);