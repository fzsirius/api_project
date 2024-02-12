const express = require('express');
const router = express.Router();

// Import existing functions
const { getLyrics } = require('./lyrics');
const { getSongInfo } = require('./songinfo');

// New route for the song profile
router.get('/:artist/:title', async (req, res) => {
  try {
    const { artist, title } = req.params;

    // Call existing functions to retrieve data
    const lyrics = await getLyrics(artist, title);
    const songInfo = await getSongInfo(artist, title);

    // Combine the responses
    const songProfile = {
      lyrics: lyrics,
      songInfo: songInfo
    };

    // Send the song profile
    res.json(songProfile);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
