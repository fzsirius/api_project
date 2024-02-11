const express = require('express');
const router = express.Router();
const axios = require('axios');
router.get('/:artist/:title', async (req, res) => {
  try {
    const { artist, title } = req.params;
    
    // Make a request to Lyrics.ovh API to get the lyrics
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    
    // Send the response from the Lyrics.ovh API
    res.json(response.data);
  } catch (error) {
    // Error handling
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
