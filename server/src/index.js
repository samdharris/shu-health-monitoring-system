const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const router = require('./routes');
const database = require('./database');
// Setup .env file
dotenv.config();

const { PORT } = process.env;

const app = express();

// Setup global middleware
app.use(bodyParser.json());

// Register router
app.use(router);

database.start();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;