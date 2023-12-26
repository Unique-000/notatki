const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Define API routes or other server-side functionality here

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

