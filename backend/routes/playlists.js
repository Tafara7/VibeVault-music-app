const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');

// Create a new playlist
router.post('/', async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    await playlist.save();
    res.status(201).send(playlist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).send({ playlists });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get playlists for feed
router.get('/feed', async (req, res) => {
  try {
    const playlists = await Playlist.find().sort({ createdAt: -1 }).populate('createdBy', 'username');
    res.status(200).send({ playlists });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a playlist by ID
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findOne({ playlistid: req.params.id }).populate('songs');
    if (!playlist) {
      return res.status(404).send({ error: 'Playlist not found' });
    }
    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a playlist by ID
router.patch('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndUpdate({ playlistid: req.params.id }, req.body, { new: true, runValidators: true });
    if (!playlist) {
      return res.status(404).send({ error: 'Playlist not found' });
    }
    res.status(200).send(playlist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a playlist by ID
router.delete('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndDelete({ playlistid: req.params.id });
    if (!playlist) {
      return res.status(404).send({ error: 'Playlist not found' });
    }
    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get playlists created by a specific user
router.get('/createdBy/:userId', async (req, res) => {
  try {
    const playlists = await Playlist.find({ createdBy: req.params.userId });
    res.status(200).send({ playlists });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Pin a comment
router.post('/:playlistId/comments/:commentId/pin', async (req, res) => {
  try {
    const { playlistId, commentId } = req.params;
    const playlist = await Playlist.findOne({ playlistid: playlistId });
    if (!playlist) {
      return res.status(404).send({ error: 'Playlist not found' });
    }

    const comment = playlist.comments.id(commentId);
    if (!comment) {
      return res.status(404).send({ error: 'Comment not found' });
    }

    playlist.comments.forEach(c => {
      if (c.commentid === parseInt(commentId)) {
        c.pinned = true;
      } else {
        c.pinned = false;
      }
    });

    await playlist.save();
    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a comment
router.delete('/:playlistId/comments/:commentId', async (req, res) => {
  try {
    const { playlistId, commentId } = req.params;
    const playlist = await Playlist.findOne({ playlistid: playlistId });
    if (!playlist) {
      return res.status(404).send({ error: 'Playlist not found' });
    }

    const comment = playlist.comments.id(commentId);
    if (!comment) {
      return res.status(404).send({ error: 'Comment not found' });
    }

    comment.remove();
    await playlist.save();
    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;