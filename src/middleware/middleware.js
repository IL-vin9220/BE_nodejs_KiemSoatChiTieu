// middleware/jsonMiddleware.js
const express = require('express');

// Middleware để phân tích JSON body
const jsonMiddleware = express.json();

module.exports = jsonMiddleware;
