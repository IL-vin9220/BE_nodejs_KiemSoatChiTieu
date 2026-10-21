import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

const SECRET_KEY = process.env.SECRETKEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRETKEY;

if (!SECRET_KEY || !REFRESH_SECRET_KEY) {
    throw new Error("Missing JWT secret configuration");
}

// Access Token - 1 giờ
export const generateToken = (payload) => {
    return jwt.sign(
        {
            ...payload,
            type: "access"
        },
        SECRET_KEY,
        {
            algorithm: "HS256",
            expiresIn: "1h"
        }
    );
};

// Xác thực Access Token
export const verifyToken = (token) => {
    const decoded = jwt.verify(token, SECRET_KEY, {
        algorithms: ["HS256"]
    });

    if (decoded.type !== "access") {
        throw new Error("Invalid access token");
    }

    return decoded;
};

// Refresh Token - không hết hạn
export const generateRefreshToken = (payload) => {
    return jwt.sign(
        {
            userId: payload.userId,
            type: "refresh"
        },
        REFRESH_SECRET_KEY,
        {
            algorithm: "HS256"
        }
    );
};

// Xác thực Refresh Token
export const verifyRefreshToken = (token) => {
    const decoded = jwt.verify(token, REFRESH_SECRET_KEY, {
        algorithms: ["HS256"]
    });

    if (
        decoded.type !== "refresh" ||
        !Number.isSafeInteger(decoded.userId) ||
        decoded.userId <= 0
    ) {
        throw new Error("Invalid refresh token");
    }

    return decoded;
};