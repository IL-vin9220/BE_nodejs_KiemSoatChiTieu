import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import routes from "./routes/indexRoute.js";
import middleware from "./middleware/middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";

config();

const app = express();

// CORS phải đặt trên cùng
app.use(cors({
    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "https://kiemsoatchitieu.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

// parse json
app.use(express.json());
app.use(bodyParser.json());

// cookie
app.use(cookieParser());

// middleware của bạn
app.use(middleware);

// routes
app.use("/api", routes);

// test api
app.post("/example", (req, res) => {
    console.log(req.body);
    res.json({
        message: "Data received",
        data: req.body
    });
});

// export default app;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});