// middleware/jsonMiddleware.js
import { json, text } from 'express';

// Middleware để phân tích JSON body
const jsonMiddleware = [
    json(),
    text({type: 'text/plain'})
];

export default jsonMiddleware;
