const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require("./routes/quiz");

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
app.use("/api/quiz", quizRoutes);
// 🟢 GET all quizzes

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port " + PORT));
