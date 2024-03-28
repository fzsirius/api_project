const express = require('express');
const router = express.Router();
const axios = require('axios');

// function getLyrics
async function getLyrics(artist, title) {
  try {
    // Make a request to the Lyrics.ovh API to get the lyrics
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    return response.data;
  } catch (error) {
    // hanle errors
    throw new Error('An error occurred while fetching lyrics');
  }
}

// Route to retrieve the lyrics of a song
router.get('/:artist/:title', async (req, res) => {
  try {
    const { artist, title } = req.params;
    
    // Call the getLyrics function to retrieve the lyrics
    const lyrics = await getLyrics(artist, title);
    
    // Send the lyrics as a response
    res.json(lyrics);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
module.exports.getLyrics = getLyrics;
