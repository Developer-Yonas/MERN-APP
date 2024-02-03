const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a song schema
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
});

const Song = mongoose.model('Song', songSchema);

// Routes
app.use(express.json());

// Create a song
app.post('/songs', async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).send(song);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all songs
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.send(songs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add other CRUD operations and statistics routes as needed

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
