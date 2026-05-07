import budgetRepo from "../repositories/budgetRepo.js";
import statusCodes from "../config/statusCodes.js"
import AppError from "../config/error.js";

async function getAllBudget(userId){
    try{
        if(!userId || userId == "") throw new AppError("Lỗi xác thực người dùng", statusCodes.BAD_REQUEST);

        let listAllBudget = await budgetRepo.getAllBudget(userId);
        return listAllBudget;
    }
    catch(error){
        if(error in AppError) throw error;

        throw new AppError("Lỗi khi lấy dữ liệu danh sách ngân sách người dùng", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function createBudget(requestData, userId){
    try{
        if(!userId || userId == "") throw new AppError("Lỗi xác thực người dùng", statusCodes.BAD_REQUEST);
        
        let newBudget = {
            "budgetName": requestData.budgetName,
            "description": requestData.description??null,
            "amountLimit": requestData.amountLimit,
            "currentAmount": requestData.currentAmount,
            "startDate": requestData.startDate,
            "endDate": requestData.endDate,
            "alertBudget": requestData.alertBudget
        };

        await budgetRepo.create(newBudget, userId);
    }
    catch(error){
        if(error in AppError) throw error;

        throw new AppError("Lỗi thêm mới ngân sách", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateBudget(requestData, userId){
    try{
        if(!userId || userId == "") throw new AppError("Lỗi xác thực người dùng", statusCodes.BAD_REQUEST);
        
        let newBudget = {
            "budgetId": requestData.budgetId,
            "budgetName": requestData.budgetName,
            "description": requestData.description??null,
            "amountLimit": requestData.amountLimit,
            "currentAmount": requestData.currentAmount,
            "startDate": requestData.startDate,
            "endDate": requestData.endDate,
            "status": requestData.status,
            "alertBudget": requestData.alertBudget
        };

        await budgetRepo.updateBudget(newBudget, userId);
    }
    catch(error){
        if(error in AppError) throw error;

        throw new AppError("Lỗi cập nhật ngân sách", statusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function softDeletedBudget(requestData, userId){
    try{
        if(!userId || userId == "") throw new AppError("Lỗi xác thực người dùng", statusCodes.BAD_REQUEST);
        else if(!requestData.budgetId || !requestData.budgetId == "") throw new AppError("Không tìm thấy id cần xóa", statusCodes.BAD_REQUEST);

        await budgetRepo.softdeletedBudget(requestData.budgetId, userId);
    }
    catch(error){
        if(error in AppError) throw error;

        throw new AppError("Lỗi xóa ngân sách", statusCodes.INTERNAL_SERVER_ERROR);
    }
}



export default{
    getAllBudget,
    createBudget,
    updateBudget,
    softDeletedBudget,
}