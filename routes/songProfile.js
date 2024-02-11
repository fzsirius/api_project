const express = require('express');
const router = express.Router();
const axios = require('axios');

// Import existing routes
const lyricsRouter = require('./lyrics');
const songinfoRouter = require('./songinfo');

// Use existing routes
router.use('/lyrics', lyricsRouter);
router.use('/songinfo', songinfoRouter);

// New route for song profile
router.get('/:artist/:title', async (req, res) => {
  try {
    const { artist, title } = req.params;

    // Call existing routes to retrieve data
    const lyricsResponse = await axios.get(`/${artist}/${title}`, { baseURL: 'http://localhost:3000/lyrics' });
    const songinfoResponse = await axios.get(`/${artist}/${title}`, { baseURL: 'http://localhost:3000/songinfo' });

    // Combine responses
    const songProfile = {
      lyrics: lyricsResponse.data,
      songInfo: songinfoResponse.data
    };

    // Send song profile
    res.json(songProfile);
  } catch (error) {
    // Error handling
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
