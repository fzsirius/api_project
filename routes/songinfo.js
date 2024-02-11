const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:artist/:title', async (req, res) => {
  try {
    const { artist, title } = req.params;
    console.log(artist, title); // Log the artist and title to check if they are received correctly
    
    // Make a request to Genius API to get the song info
    const response = await axios.get(`https://api.genius.com/search?q=${encodeURIComponent(artist)}%20${encodeURIComponent(title)}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.GENIUS_API_KEY
      }
    });
    
    // Send the response from the Genius API
    res.json(response.data.response.hits[0].result);
  } catch (error) {
    // Error handling
    console.error(error); // Log the error to the server console
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
