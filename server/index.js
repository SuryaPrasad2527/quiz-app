const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Quiz = require('./models/Quiz');
const Result = require('./models/Result');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas Connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 🟢 Test route
app.get('/', (req, res) => {
  res.send("API Running 🚀");
});

// 🟢 GET all quizzes
app.get('/api/quiz', async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// 🟢 CREATE quiz
app.post('/api/quiz/create', async (req, res) => {
  const quiz = new Quiz(req.body);
  await quiz.save();
  res.json(quiz);
});

// 🟢 SUBMIT quiz
app.post('/api/quiz/submit/:id', async (req, res) => {
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
});

// 🟢 GET results for a quiz
app.get('/api/results/:quizId', async (req, res) => {
  const results = await Result.find({ quizId: req.params.quizId });
  res.json(results);
});

app.listen(5000, () => console.log("Server running on port 5000"));
