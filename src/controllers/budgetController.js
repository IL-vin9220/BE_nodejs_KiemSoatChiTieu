import budgetService from "../services/budgetService.js";
import statusCodes from "../config/statusCodes.js";

export const getAllBudget = async (req, res) => {
    try{
        let userId = req.user.userId;
        let listAllBudget = await budgetService.getAllBudget(userId);
        res.status(statusCodes.OK).json({message: "Lấy danh sách ngân sách thành công", data: listAllBudget});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export const createBudget = async (req, res) => {
    try{
        let userId = req.user.userId;
        let requestData = req.body;
        await budgetService.createBudget(requestData, userId);
        res.status(statusCodes.OK).json({message: "Thêm mới ngân sách thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export const updateBudget = async (req, res) => {
    try{
        let userId = req.user.userId;
        let requestData = req.body;
        await budgetService.updateBudget(requestData, userId);
        res.status(statusCodes.OK).json({message: "Cập nhật ngân sách thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export const softDeletedBudget = async (req, res) => {
    try{
        let userId = req.user.userId;
        let requestData = req.body;
        await budgetService.softDeletedBudget(requestData, userId);
        res.status(statusCodes.OK).json({message: "Xóa ngân sách thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}