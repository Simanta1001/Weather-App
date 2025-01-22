const express = require('express');
const app = express();
const cors = require('cors');

// Your existing code for setting up routes

// Ensure the app listens on the correct port
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not provided
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
