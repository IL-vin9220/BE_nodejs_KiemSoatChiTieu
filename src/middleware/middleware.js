// middleware/jsonMiddleware.js
const express = require('express');

// Middleware để phân tích JSON body
const jsonMiddleware = [
    express.json(),
    express.text({type: 'text/plain'})
];

module.exports = jsonMiddleware;
