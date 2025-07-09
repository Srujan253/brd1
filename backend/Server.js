// backend/Server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/brd_wishes';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schemas
const wishSchema = new mongoose.Schema({
  name: String,
  wish: String,
  date: String
});

const quizScoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
  date: String
});
const memoryScoreSchema = new mongoose.Schema({
  name: String,
  moves: Number,
  date: String
});

const Wish = mongoose.model('Wish', wishSchema);
const QuizScore = mongoose.model('QuizScore', quizScoreSchema, 'quizscores');
const MemoryScore = mongoose.model('MemoryScore', memoryScoreSchema, 'memoryscores');

// Routes
app.get('/api/wishes', async (req, res) => {
  const wishes = await Wish.find().sort({ _id: -1 });
  res.json(wishes);
});

app.post('/api/wishes', async (req, res) => {
  const { name, wish, date } = req.body;
  const newWish = new Wish({ name, wish, date });
  await newWish.save();
  res.status(201).json(newWish);
});

app.delete('/api/wishes', async (req, res) => {
  await Wish.deleteMany({});
  res.json({ message: 'All wishes deleted' });
});

app.delete('/api/wishes/:id', async (req, res) => {
  await Wish.findByIdAndDelete(req.params.id);
  res.json({ message: 'Wish deleted' });
});


// Quiz Game Scores
app.get('/api/quizscores', async (req, res) => {
  const scores = await QuizScore.find().sort({ score: -1 });
  res.json(scores);
});

app.post('/api/quizscores', async (req, res) => {
  const { name, score, date } = req.body;
  const newScore = new QuizScore({ name, score, date });
  await newScore.save();
  res.status(201).json(newScore);
});

// Memory Game Scores
app.get('/api/memoryscores', async (req, res) => {
  const scores = await MemoryScore.find().sort({ moves: 1 });
  res.json(scores);
});

app.post('/api/memoryscores', async (req, res) => {
  const { name, moves, date } = req.body;
  const newScore = new MemoryScore({ name, moves, date });
  await newScore.save();
  res.status(201).json(newScore);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
