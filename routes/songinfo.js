const express = require('express');
const router = express.Router();
const axios = require('axios');

// Définition de la fonction getSongInfo
async function getSongInfo(artist, title) {
  try {
    // Faire une requête à l'API Genius pour obtenir les informations sur la chanson
    const response = await axios.get(`https://api.genius.com/search?q=${encodeURIComponent(artist)}%20${encodeURIComponent(title)}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.GENIUS_API_KEY
      }
    });
    return response.data.response.hits[0].result;
  } catch (error) {
    // Gérer les erreurs
    throw new Error('An error occurred while fetching song info');
  }
}

// Route pour obtenir les informations sur une chanson
router.get('/:artist/:title', async (req, res) => {
  try {
    const { artist, title } = req.params;
    
    // Appeler la fonction getSongInfo pour récupérer les informations sur la chanson
    const songInfo = await getSongInfo(artist, title);
    
    // Envoyer les informations sur la chanson en réponse
    res.json(songInfo);
  } catch (error) {
    // Gérer les erreurs
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
module.exports.getSongInfo = getSongInfo;

