const express = require('express');
const router = express.Router();
const axios = require('axios');

// Define the getSongInfo function
async function getSongInfo(artist, title) {
  // Check if artist or title is missing or empty
  if (!artist || !title) {
    throw new Error('Both artist and title must be provided');
  }

  try {
    // Make a request to the Genius API to get information about the song
    const response = await axios.get(`https://api.genius.com/search?q=${encodeURIComponent(artist)}%20${encodeURIComponent(title)}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.GENIUS_API_KEY
      }
    });
    return response.data.response.hits[0].result; // Return the result
  } catch (error) {
    // Handle errors
    throw new Error('An error occurred while fetching song info');
  }
}

// Route to get information about a song
router.get('/:artist/:title', async (req, res) => {
  try {
    const { artist, title } = req.params;
    
    // Call the getSongInfo function to retrieve information about the song
    const songInfo = await getSongInfo(artist, title);
    
    // Send information about the song in response
    res.json(songInfo);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
module.exports.getSongInfo = getSongInfo;
