import fundRepo from '../repositories/fundRepo.js';
import AppError from '../config/error.js';
import statusCodes from '../config/statusCodes.js';

async function getAllFundByUserId(userId){
    try{
        if(!userId) throw new AppError("Không Tìm Được Người Dùng", statusCodes.BAD_REQUEST);

        let fundList = await fundRepo.getAllFundByUserId(userId);
        return fundList;
    }
    catch(error){
        if(error in AppError) throw new error;

        throw new AppError("Lỗi Lấy Danh Sách Quỹ Tài Chính", statusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function createNewFund(dataRequest, userId){
    try{
        if(!userId) throw new AppError("Không Tìm Được Người Dùng", statusCodes.BAD_REQUEST);

        if(!dataRequest ||
            !dataRequest.fundName || dataRequest.fundName.trim() == ""
        )
        {
            throw new AppError("Thông Tin Tên Quỹ Không Hợp Lệ", statusCodes.BAD_REQUEST);
        }

        let newFund = {
            "fundName": dataRequest.fundName,
            "fundIcon": dataRequest.fundIcon,
            "amountMin": dataRequest.amountMin,
            "amountMax": dataRequest.amountMax,
            "amount": dataRequest.currentAmount,
            "fundColor": dataRequest.fundColor,
            "description": dataRequest.description,
            "amountTarget": dataRequest.amountTarget,
            "type": dataRequest.type
        };

        await fundRepo.createNewFund(newFund, userId);
    }
    catch(error){
        if(error in AppError) throw new error;

        throw new AppError("Lỗi Lấy Danh Sách Quỹ Tài Chính", statusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function updateFund(dataRequest, userId){
    try{
        if(!userId) throw new AppError("Không Tìm Được Người Dùng", statusCodes.BAD_REQUEST);

        if(!dataRequest ||
            !dataRequest.fundName || dataRequest.fundName.trim() == ""
        )
        {
            throw new AppError("Thông Tin Tên Quỹ Không Hợp Lệ", statusCodes.BAD_REQUEST);
        }

        const isActiveRaw = String(dataRequest.isActive).toLowerCase();

        if (isActiveRaw !== "true" && isActiveRaw !== "false") {
            throw new AppError("Lỗi Truyền Vào Dữ Liệu Trạng Thái", statusCodes.BAD_REQUEST);
        }

        const active = isActiveRaw === "true";

        let newFund = {
            "fundId": dataRequest.fundId,
            "isActive": active,
            "fundName": dataRequest.fundName,
            "fundIcon": dataRequest.fundIcon,
            "amountMin": dataRequest.amountMin,
            "amountMax": dataRequest.amountMax,
            "amount": dataRequest.currentAmount,
            "fundColor": dataRequest.fundColor,
            "description": dataRequest.description,
            "amountTarget": dataRequest.amountTarget,
            "type": dataRequest.type
        };

        await fundRepo.updateFund(newFund, userId);
    }
    catch(error){
        if(error in AppError) throw new error;

        throw new AppError("Lỗi Cập Nhật Quỹ Tài Chính", statusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function softDeletedFund(fundId, userId){
    try{
        if(!userId) throw new AppError("Không Tìm Được Người Dùng", statusCodes.BAD_REQUEST);

        if(!fundId ||
            !fundId.fundId || fundId.fundId.trim() == ""
        )
        {
            throw new AppError("Thông Tin Tên Quỹ Không Hợp Lệ", statusCodes.BAD_REQUEST);
        }

        await fundRepo.softDeletedFund(fundId.fundId, userId);
    }
    catch(error){
        if(error in AppError) throw new error;

        throw new AppError("Lỗi Xóa Quỹ Tài Chính", statusCodes.INTERNAL_SERVER_ERROR)
    }
}


// type fund -->
// chi tiêu: min, current
// tiết kiệm: max, current
// đầu tư: target, current
// khẩn cấp: min(alert), current
// dự phòng: min, current

export default {
    getAllFundByUserId,
    createNewFund,
    updateFund,
    softDeletedFund,
}