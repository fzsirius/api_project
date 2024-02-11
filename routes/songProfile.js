const express = require('express');
const router = express.Router();

// Import des fonctions existantes
const { getLyrics } = require('./lyrics');
const { getSongInfo } = require('./songinfo');

// Nouvelle route pour le profil de la chanson
router.get('/:artist/:title', async (req, res) => {
  try {
    const { artist, title } = req.params;

    // Appel des fonctions existantes pour récupérer les données
    const lyrics = await getLyrics(artist, title);
    const songInfo = await getSongInfo(artist, title);

    // Combinaison des réponses
    const songProfile = {
      lyrics: lyrics,
      songInfo: songInfo
    };

    // Envoi du profil de la chanson
    res.json(songProfile);
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
