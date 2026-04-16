import walletRepository from "../repositories/walletRepo.js";
import statusCodes from "../config/statusCodes.js";
import AppError from "../config/error.js";

async function getAllWallet(userId){
    try{
        let dataWalletList = walletRepository.getWallet();

        return dataWalletList;
    }
    catch(error){
        throw new AppError("Lỗi lấy thông tin tài khoản người dùng", statusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function getAllAmountWalletByUserIDAndActive(userId) {
    try{
        let dataResponseDB = await walletRepository.calculateAmountWalletsActiveByUserId(userId.toString());

        return dataResponseDB;

    }
    catch(error){
        throw new AppError("Lỗi lấy thông tin tài khoản người dùng", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    getAllWallet,
    getAllAmountWalletByUserIDAndActive
}