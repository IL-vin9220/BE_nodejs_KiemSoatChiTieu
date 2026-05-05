import { Router } from "express";
let fundRoute = Router();
import {
    getAllFundByUserId,
    createNewFund,
    updateFund,
    softDeletedFund,
} from "../controllers/fundController.js";
import authMiddleware from "../middleware/middleware.js"

fundRoute.put("/create", authMiddleware, createNewFund);
fundRoute.put("/update", authMiddleware, updateFund);
// fundRoute.post("/search", authMiddleware, searchCategory);
fundRoute.put("/delete", authMiddleware, softDeletedFund);
fundRoute.get("/get-all", authMiddleware, getAllFundByUserId);

export default fundRoute;