import AppError from "../config/error.js";
import statusCodes from "../config/statusCodes.js";
import walletService from "../services/walletService.js"

export async function getAllWallet(req, res){
    try{
        // let userID = req.user.userId;
        let userId = 1;
        let walletList = await walletService.getAllWallet(userId);
        res.status(statusCodes.OK).json({message: "Lấy Danh Sách Ví Thành Công", data: walletList});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function getAllAmountWalletActiveByUserId(req, res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;

        let totalAmount = await walletService.getAllAmountWalletByUserIDAndActive(userId);
        res.status(statusCodes.OK).json({message: "SUCCESS", data: totalAmount});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function createNewWallet(req, res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let dataRequest = req.body;

        await walletService.createNewWallet(dataRequest, userId);
        res.status(statusCodes.OK).json({message: "Thêm Mới Ví Thành Công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function updateWallet(req, res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let dataRequest = req.body;
        await walletService.updateWallet(dataRequest, userId);
        res.status(statusCodes.OK).json({message: "Cập Nhật Ví Thành Công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function softDeletedWallet(req, res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let dataRequest = req.body;
        await walletService.softDeletedWallet(dataRequest, userId);
        res.status(statusCodes.OK).json({message: "Xóa Dữ Liệu Ví Thành Công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function getWalletNameList(req, res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let dataRequest = req.body;
        let walletNameListRes = await walletService.getWalletNameList(userId);
        res.status(statusCodes.OK).json({message: "Lấy danh sách tên ví Thành Công", data: walletNameListRes});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}