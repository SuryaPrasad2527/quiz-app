const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const quizRoutes = require("./routes/quiz");
const Result = require('./models/Result');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("MY SERVER IS RUNNING ✅");
});

// Quiz routes (handles GET, CREATE, SUBMIT)
app.use("/api/quiz", quizRoutes);

// Results route
app.get('/api/results/:quizId', async (req, res) => {
  try {
    const results = await Result.find({ quizId: req.params.quizId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Render PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
