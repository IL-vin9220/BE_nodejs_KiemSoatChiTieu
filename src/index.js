const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes/indexRoute');
let common = require("./controllers/processController");
const middleware = require("./middleware/middleware");

dotenv.config(); // Tải biến môi trường từ file .env

const app = express();

app.use(middleware);

app.use(bodyParser.json());

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
