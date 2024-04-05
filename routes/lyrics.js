const express = require('express');
const router = express.Router();
const axios = require('axios');

// function getLyrics
async function getLyrics(artist, title) {
  if (!artist || !title) {
    throw new Error('Both artist and title must be provided');
  }

  try {
    // Make a request to the Lyrics.ovh API to get the lyrics
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    if (response.data.lyrics) {
      return response.data;
    } else {
      throw new Error('Lyrics not found');
    }
  } catch (error) {
    // handle errors
    if (error.response && error.response.status === 404) {
      throw new Error('Lyrics not found');
    } else {
      throw new Error('An error occurred while fetching lyrics');
    }
  }
}

// Route to retrieve the lyrics of a song
router.get('/:artist/:title', async (req, res) => {
  const { artist, title } = req.params;
  
  try {
    // Call the getLyrics function to retrieve the lyrics
    const lyrics = await getLyrics(artist, title);
    
    // Send the lyrics as a response
    res.json(lyrics);
  } catch (error) {
    if (error.message === 'Lyrics not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message === 'Both artist and title must be provided') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  }
});

module.exports = router;
module.exports.getLyrics = getLyrics;
