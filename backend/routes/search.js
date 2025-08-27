const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Playlist = require('../models/playlist');
const Song = require('../models/song');
const Fuse = require('fuse.js');

router.get('/', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const users = await User.find().select('userId username');
    const playlists = await Playlist.find().select('playlistid name');
    const songs = await Song.find().select('songsid title artist');

    const fuseOptions = {
      includeScore: true,
      keys: ['username', 'name', 'title', 'artist', 'hashtags', 'category']
    };

    const fuse = new Fuse([...users, ...playlists, ...songs], fuseOptions);
    const results = fuse.search(query);

    res.status(200).json({ results });
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;