import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

const SECRET_KEY = process.env.SECRETKEY;

export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: "1h"
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};