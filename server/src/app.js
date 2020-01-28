const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const router = require('./routes');

// Setup .env file
dotenv.config();

const app = express();

// Setup global middleware
app.use(bodyParser.json());

// Register router
app.use(router);

module.exports = app;
