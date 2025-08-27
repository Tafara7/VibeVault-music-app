const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: String,
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }
});

songSchema.plugin(AutoIncrement, { inc_field: 'songsid' });

module.exports = mongoose.model('Song', songSchema);