const express = require('express');
const router = express.Router();
const axios = require('axios');

// Définition de la fonction getLyrics
async function getLyrics(artist, title) {
  try {
    // Faire une requête à l'API Lyrics.ovh pour obtenir les paroles
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    return response.data;
  } catch (error) {
    // Gérer les erreurs
    throw new Error('An error occurred while fetching lyrics');
  }
}

// Route pour obtenir les paroles d'une chanson
router.get('/:artist/:title', async (req, res) => {
  try {
    const { artist, title } = req.params;
    
    // Appeler la fonction getLyrics pour récupérer les paroles
    const lyrics = await getLyrics(artist, title);
    
    // Envoyer les paroles en réponse
    res.json(lyrics);
  } catch (error) {
    // Gérer les erreurs
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
module.exports.getLyrics = getLyrics;
