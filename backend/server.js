"use strict";

// Tafara Hwata u22565991
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path");

// Create app
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve a static page in the public directory
app.use(express.static("frontend/public"));

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://u22565991:Xboxone100@cluster0.7wbwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Import routes
const usersRouter = require('../routes/users');
const playlistsRouter = require('../routes/playlists');
const songsRouter = require('../routes/songs');
const searchRouter = require('../routes/search');

// Use routes
app.use('/api/users', usersRouter);
app.use('/api/playlists', playlistsRouter);
app.use('/api/songs', songsRouter);
app.use('/api/search', searchRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('frontend', 'public', 'index.html'));
});



// Port to listen to
app.listen(3000, function () {
  console.log("Listening on localhost:3000");
});