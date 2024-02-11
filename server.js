require('dotenv').config();
const express = require('express');
const app = express();

console.log(process.env.GENIUS_API_KEY); // Log the Genius API key to check if it is loaded correctly

// Import the lyrics route
const lyricsRouter = require('./routes/lyrics');
// Use the lyrics route
app.use('/lyrics', lyricsRouter);

// Import the songinfo route
const songinfoRouter = require('./routes/songinfo');
// Use the songinfo route
app.use('/songinfo', songinfoRouter);

// Example route
app.get('/', (req, res) => {
  // Send a response with the message 'Hello, world!'
  res.send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Log a message indicating that the server is listening on a specific port
  console.log(`Server is listening on port ${PORT}`);
});
