// Import the Express framework
const express = require('express');
// Create an Express application instance
const app = express();

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
