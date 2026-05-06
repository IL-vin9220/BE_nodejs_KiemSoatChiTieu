import axios from "axios";
import categoryRepo from '../repositories/categoryRepo.js';
import statusCodes from "../config/statusCodes.js";
import AppError from "../config/error.js";

// thêm danh mục
async function addCategory(requestData, userId){
    try{
        let categoryItem = {
            "name": requestData.categoryName,
            "icon": requestData.icon??null,
            "parentId": requestData.parentId??null,
            "type": requestData.type,
            "description": requestData.description
        }

        // thêm vào db
        await categoryRepo.createNew(categoryItem, userId);
    }
    catch{
        throw new AppError("Lỗi thêm danh mục", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCategory(requestData, userId){
    try{
        let categoryItem = {
            "code": requestData.categoryCode,
            "name": requestData.categoryName,
            "parentId": requestData.parentId,
            "icon": requestData.icon,
            "type": requestData.type,
            "status": requestData.status,
            "description": requestData.description
        }

        let itemUpdate = await categoryRepo.updateCategory(categoryItem, userId);
        
    }
    catch(error){
        if(error in AppError) throw error;

        throw new AppError("Lỗi Cập Nhật danh mục", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function softDeleteCategory(requestData, userId){
    try{
        if(!requestData || requestData.id == "") throw new AppError("Không Nhận Được Dữ Liệu", statusCodes.BAD_REQUEST);

        await categoryRepo.softDeleteCategory(requestData.id, userId);
    }
    catch(error){
        if(error in AppError) throw error

        throw new AppError("Lỗi Xóa Danh Mục", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function searchCategory(requestData, userId){
    try{
        // validate
        if(!requestData || requestData.name == ""){
            throw new AppError("Giá trị tìm kiếm không được để trống", statusCodes.BAD_REQUEST);
        }

        let searchData = await categoryRepo.searchCategory(requestData, userId);
        return searchData;
    }
    catch(error){
        throw new AppError("Lỗi tìm kiếm bản ghi danh mục", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllCategory(userId){
    try{
        let listCategory = await categoryRepo.getAllCategory(userId);
        return listCategory;
    }
    catch(error){
        throw new AppError("Lỗi lấy danh sách bản ghi danh mục", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getTotalAmountByCategoryTypeExpense(userId){
    try{
        let totalAmount = await categoryRepo.listCategoryExpense(userId);
        return totalAmount
    }
    catch(error){
        throw new AppError("Lỗi lấy danh sách bản ghi danh mục", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    getAllCategory,
    addCategory,
    updateCategory,
    softDeleteCategory,
    searchCategory,
    getTotalAmountByCategoryTypeExpense,
};

