import { Router } from "express";
let walletRoute = Router();
import { 
    getAllWallet,
    getAllAmountWalletActiveByUserId,
    createNewWallet,
    updateWallet,
    softDeletedWallet,
    getWalletNameList,
} from "../controllers/walletController.js";
import authMiddleware from "../middleware/middleware.js"

walletRoute.get("/get-all", getAllWallet);
walletRoute.get("/amountWalletActive", getAllAmountWalletActiveByUserId);
walletRoute.put("/create", createNewWallet);
walletRoute.put('/update', updateWallet);
walletRoute.put('/delete', softDeletedWallet);
walletRoute.get('/name-list', getWalletNameList)
// walletRoute.post("/login", authMiddleware, login);

export default walletRoute;