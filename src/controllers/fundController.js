import fundServices from '../services/fundServices.js';
import statusCodes from '../config/statusCodes.js';
import AppError from '../config/error.js';

export const getAllFundByUserId = async (req, res) => {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let fundList = await fundServices.getAllFundByUserId(userId);
        res.status(statusCodes.OK).json({message: "Lấy Dữ Liệu Thành Công", data: fundList});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCodes? error.statusCodes: 500;
        res.status(status).json({message: error.message || "Lỗi server"});
    }
}

export const createNewFund = async (req, res) => {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let dataRequest = req.body;
        await fundServices.createNewFund(dataRequest, userId);
        res.status(statusCodes.OK).json({message: "Thêm Quỹ Tài Chính Thành Công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCodes? error.statusCodes: 500;
        res.status(status).json({message: error.message || "Lỗi server"});
    }
}

export const updateFund = async (req, res) => {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let dataRequest = req.body;
        let fundList = await fundServices.updateFund(dataRequest, userId);
        res.status(statusCodes.OK).json({message: "Cập Nhật Quỹ Tài Chính Thành Công", data: fundList});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCodes? error.statusCodes: 500;
        res.status(status).json({message: error.message || "Lỗi server"});
    }
}

export const softDeletedFund = async (req, res) => {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let dataRequest = req.body;
        let fundList = await fundServices.softDeletedFund(dataRequest, userId);
        res.status(statusCodes.OK).json({message: "Xóa Quỹ Tài Chính Thành Công", data: fundList});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCodes? error.statusCodes: 500;
        res.status(status).json({message: error.message || "Lỗi server"});
    }
}