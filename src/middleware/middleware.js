import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js";

export default function authMiddleware(req, res, next) {
    const token = req.cookies?.accessToken;

    if (!token) {
        return res.status(401).json({
            code: "ACCESS_TOKEN_MISSING",
            message: "Chưa đăng nhập"
        });
    }

    try {
        const decoded = verifyToken(token);

        req.user = {
            userId: decoded.userId
        };

        return next();

    } catch (error) {

        // Access Token hết hạn
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                code: "ACCESS_TOKEN_EXPIRED",
                message: "Access Token đã hết hạn"
            });
        }

        // Token không hợp lệ
        return res.status(401).json({
            code: "ACCESS_TOKEN_INVALID",
            message: "Access Token không hợp lệ"
        });
    }
}