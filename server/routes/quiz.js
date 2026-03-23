const router = require('express').Router();
const Quiz = require('../models/Quiz');

// Create Quiz
router.post('/create', async (req, res) => {
  const quiz = new Quiz(req.body);
  await quiz.save();
  res.json(quiz);
});

// Get all quizzes
router.get('/', async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// Get single quiz
router.get('/:id', async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
});

// Submit quiz
router.post('/submit/:id', async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  let score = 0;

  req.body.answers.forEach((ans, index) => {
    if (ans === quiz.questions[index].correctAnswer) {
      score++;
    }
  });

  res.json({ score, total: quiz.questions.length });
});

module.exports = router;