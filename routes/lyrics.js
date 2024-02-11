const express = require('express');
const router = express.Router();
const Genius = require('genius-api');

// Initialize Genius API client
const genius = new Genius(process.env.GENIUS_API_KEY);

// Route to search for song lyrics
router.get('/:song', async (req, res) => {
  try {
    // Search for the song on Genius
    const searchResult = await genius.search(req.params.song);
    
    // Ensure a song was found
    if (searchResult.hits.length > 0) {
      const songId = searchResult.hits[0].result.id;
      
      // Get details of the song
      const song = await genius.song(songId);
      
      // Send the song lyrics in response
      res.json({ lyrics: song.lyrics });
    } else {
      // If no song was found, return a 404 error
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (error) {
    // Error handling
    res.status(500).json({ message: 'An error occurred', error });
  }
});

module.exports = router;
