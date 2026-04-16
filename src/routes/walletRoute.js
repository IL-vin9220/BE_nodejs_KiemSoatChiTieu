import { Router } from "express";
let walletRoute = Router();
import { 
    getAllWallet,
    getAllAmountWalletActiveByUserId } from "../controllers/walletController.js";
import authMiddleware from "../middleware/middleware.js"

walletRoute.put("/wallet", authMiddleware, getAllWallet);
walletRoute.get("/amountWalletActive", authMiddleware, getAllAmountWalletActiveByUserId);
// walletRoute.post("/login", login);

export default walletRoute;