import express from 'express';
import pkg from 'body-parser';
import { config } from 'dotenv';
import routes from './routes/indexRoute.js';
import middleware from "./middleware/middleware.js";

config(); // Tải biến môi trường từ file .env

const app = express();
const { json } = pkg;

app.use(middleware);

app.use(json());

// Gắn router
app.use('/api', routes); // Truy cập: POST http://localhost:3000/api/users

app.post('/example', (req, res) => {
  console.log(req.body); // sẽ là dữ liệu JSON bạn gửi trong request body
  res.send('Data received');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
