import walletRepo from "../repositories/walletRepo.js";
import statusCodes from "../config/statusCodes.js";
import AppError from "../config/error.js";

async function getAllWallet(userId){
    try{
        let dataWalletList = await walletRepo.getWallet(userId);

        return dataWalletList;
    }
    catch(error){
        throw new AppError("Lỗi lấy thông tin tài khoản người dùng", statusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function getAllAmountWalletByUserIDAndActive(userId) {
    try{
        let dataResponseDB = await walletRepo.calculateAmountWalletsActiveByUserId(userId.toString());

        return dataResponseDB;

    }
    catch(error){
        throw new AppError("Lỗi lấy thông tin tài khoản người dùng", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function createNewWallet(requestData, userId){
    try{
        if(!requestData || 
            !requestData.walletName || requestData.walletName.trim() == "" ||
            !requestData.walletAmount || requestData.walletAmount.trim() == "") throw new AppError("Lỗi Lấy Dữ liệu Từ FrontEnd", statusCodes.BAD_REQUEST);

        let newWallet = {
            "walletName": requestData.walletName,
            "walletIcon": requestData.walletIcon,
            "walletAmount": requestData.walletAmount,
            "type": requestData.type,
            "color": requestData.color
        };

        await walletRepo.createNew(newWallet, userId);
    }
    catch(error){
        if(error in AppError) throw error;

        throw new AppError("Lỗi Thêm Mới dữ liệu Ví Tiền", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateWallet(requestData, userId){
    try{
        if(!requestData || 
            !requestData.id || requestData.id.trim() == "" ||
            !requestData.walletName || requestData.walletName.trim() == "" ||
            !requestData.walletAmount || requestData.walletAmount.trim() == "" ||
            !requestData.statusActive || requestData.statusActive.trim() == "") throw new AppError("Lỗi Lấy Dữ liệu Từ FrontEnd", statusCodes.BAD_REQUEST);

        let newWallet = {
            "id": requestData.id,
            "walletName": requestData.walletName,
            "walletIcon": requestData.walletIcon,
            "walletAmount": requestData.walletAmount,
            "type": requestData.type,
            "color": requestData.color,
            "statusActive": requestData.statusActive
        };

        await walletRepo.updateWallet(newWallet, userId);
    }
    catch(error){
        if(error in AppError) throw error;

        throw new AppError("Lỗi Cập Nhật dữ liệu Ví Tiền", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function softDeletedWallet(requestData, userId){
    try{
        if(!requestData || requestData.id == "") throw new AppError("Lỗi Lấy Dữ liệu Từ FrontEnd", statusCodes.BAD_REQUEST);

        let newWallet = {

        };

        await walletRepo.softDeleteWallet(requestData.id, userId);
    }
    catch(error){
        if(error in AppError) throw error;

        throw new AppError("Lỗi Xóa dữ liệu Ví Tiền", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getWalletNameList(userId){
    try{
        if(!userId || userId == "") throw new AppError("Lỗi Lấy Dữ liệu Từ FrontEnd", statusCodes.BAD_REQUEST);

        let getWalletNameList = await walletRepo.getWalletNameList(userId);
        return getWalletNameList;
    }
    catch(error){
        if(error in AppError) throw error;

        throw new AppError("Lỗi Xóa dữ liệu Ví Tiền", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    getAllWallet,
    getAllAmountWalletByUserIDAndActive,
    createNewWallet,
    updateWallet,
    softDeletedWallet,
    getWalletNameList,
}