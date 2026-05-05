import { Router } from "express";
let walletRoute = Router();
import { 
    getAllWallet,
    getAllAmountWalletActiveByUserId,
    createNewWallet,
    updateWallet,
    softDeletedWallet,
} from "../controllers/walletController.js";
import authMiddleware from "../middleware/middleware.js"

walletRoute.get("/get-all", authMiddleware, getAllWallet);
walletRoute.get("/amountWalletActive", authMiddleware, getAllAmountWalletActiveByUserId);
walletRoute.put("/create", authMiddleware, createNewWallet);
walletRoute.put('/update', authMiddleware, updateWallet);
walletRoute.put('/delete', authMiddleware, softDeletedWallet);
// walletRoute.post("/login", authMiddleware, login);

export default walletRoute;