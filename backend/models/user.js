const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: String,
  profilePicture: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  playlists: [{ type: String }], // Assuming playlists are stored as an array of strings
  online: { type: Boolean, default: false }
});

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('User', userSchema);