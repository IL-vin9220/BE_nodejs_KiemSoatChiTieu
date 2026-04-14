// middleware/jsonMiddleware.js
// import { json, text } from 'express';

// Middleware để phân tích JSON body
// const jsonMiddleware = [
//     json(),
//     text({type: 'text/plain'})
// ];

// export default jsonMiddleware;


import { verifyToken } from "../utils/jwt.js";
import dotenv from 'dotenv'

dotenv.config();

export default function authMiddleware(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    try {
        const decoded = verifyToken(token, process.env.SECRETKEY);
        req.user = {
            userId: decoded.userId
        }
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token không hợp lệ" });
    }
}