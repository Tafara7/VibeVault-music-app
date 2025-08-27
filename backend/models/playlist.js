const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentSchema = new mongoose.Schema({
  text: String
});

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }
});

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  coverImage: String,
  hashtags: [String],
  songs: [songSchema],
  comments: [commentSchema],
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

playlistSchema.plugin(AutoIncrement, { inc_field: 'playlistid' });
songSchema.plugin(AutoIncrement, { inc_field: 'songid' });
commentSchema.plugin(AutoIncrement, { inc_field: 'commentid' });

module.exports = mongoose.model('Playlist', playlistSchema);