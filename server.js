require('dotenv').config();
const express = require('express');
const app = express();

// Import existing routes
const lyricsRouter = require('./routes/lyrics');
const songinfoRouter = require('./routes/songinfo');
const songProfileRouter = require('./routes/songProfile');

// Use existing routes
app.use('/lyrics', lyricsRouter);
app.use('/songinfo', songinfoRouter);
app.use('/songProfile', songProfileRouter);

// Public folder
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
