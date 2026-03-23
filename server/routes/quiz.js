const express = require("express");
const router = express.Router();

const Quiz = require("../models/Quiz");
const Result = require("../models/Result");

// GET all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  console.log("🔥 /api/quiz route hit");

  try {
    const quizzes = await Quiz.find();
    console.log("DATA:", quizzes);

    res.json(quizzes);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
// CREATE quiz
router.post("/create", async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SUBMIT quiz
router.post("/submit/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    const { answers, username } = req.body;

    let score = 0;

    quiz.questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) {
        score++;
      }
    });

    await Result.create({
      username: username || "Anonymous",
      quizId: quiz._id,
      score,
      total: quiz.questions.length
    });

    res.json({ score, total: quiz.questions.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
