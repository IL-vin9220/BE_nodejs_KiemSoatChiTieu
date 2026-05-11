import { Router } from "express";
let fundRoute = Router();
import {
    getAllFundByUserId,
    createNewFund,
    updateFund,
    softDeletedFund,
} from "../controllers/fundController.js";
import authMiddleware from "../middleware/middleware.js"

fundRoute.put("/create", createNewFund);
fundRoute.put("/update", updateFund);
// fundRoute.post("/search", searchCategory);
fundRoute.put("/delete", softDeletedFund);
fundRoute.get("/get-all", getAllFundByUserId);

export default fundRoute;