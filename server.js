require('dotenv').config();
const express = require('express');
const app = express();

// Import des routes existantes
const lyricsRouter = require('./routes/lyrics');
const songinfoRouter = require('./routes/songinfo');
const songProfileRouter = require('./routes/songProfile');

// Utilisation des routes existantes
app.use('/lyrics', lyricsRouter);
app.use('/songinfo', songinfoRouter);
app.use('/songProfile', songProfileRouter);

// Dossier public
app.use(express.static('public'));

// Start du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
