const express = require('express');
const router = express.Router();
const Song = require('../models/song');

// Create a new song
router.post('/', async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).send(song);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).send({ songs });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a song by ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findOne({ songsid: req.params.id });
    if (!song) {
      return res.status(404).send({ error: 'Song not found' });
    }
    res.status(200).send(song);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a song by ID
router.patch('/:id', async (req, res) => {
  try {
    const song = await Song.findOneAndUpdate({ songsid: req.params.id }, req.body, { new: true, runValidators: true });
    if (!song) {
      return res.status(404).send({ error: 'Song not found' });
    }
    res.status(200).send(song);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a song by ID
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findOneAndDelete({ songsid: req.params.id });
    if (!song) {
      return res.status(404).send({ error: 'Song not found' });
    }
    res.status(200).send(song);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;