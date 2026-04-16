import AppError from "../config/error.js";
import statusCodes from "../config/statusCodes.js";
import walletService from "../services/walletService.js"

export async function getAllWallet(req, res){
    try{
        let userID = req.user
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function getAllAmountWalletActiveByUserId(req, res) {
    try{
        let userId = req.user.userId;

        let totalAmount = await walletService.getAllAmountWalletByUserIDAndActive(userId);
        res.status(statusCodes.OK).json({message: "SUCCESS", data: totalAmount});
    }
    catch(error){

    }
}