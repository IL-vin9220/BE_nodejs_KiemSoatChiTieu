import categoryServices from "../services/categoryService.js";
import statusCodes from "../config/statusCodes.js";
import AppError from "../config/error.js";

export async function createCategory(req, res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let requestData = req.body;
        await categoryServices.addCategory(requestData, userId);
        // let category = await autoCompleteCategory(req, res);
        res.status(statusCodes.OK).json({message: "Thêm danh mục mới thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function updateCategory(req, res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let requestData = req.body;
        await categoryServices.updateCategory(requestData, userId);
        // let category = await autoCompleteCategory(req, res);
        res.status(statusCodes.OK).json({message: "Cập nhật danh mục thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function softDeleteCategory(req, res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let requestData = req.body;
        await categoryServices.softDeleteCategory(requestData, userId);
        // let category = await autoCompleteCategory(req, res);
        res.status(statusCodes.OK).json({message: "Xóa danh mục thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function searchCategory(req, res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let requestData = req.body;
        let listCategory = await categoryServices.searchCategory(requestData, userId);
        // let category = await autoCompleteCategory(req, res);
        res.status(statusCodes.OK).json({message: "Tìm kiếm danh mục thành công", data: listCategory});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function getAll(req, res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let listCategory = await categoryServices.getAllCategory(userId);
        // let category = await autoCompleteCategory(req, res);
        res.status(statusCodes.OK).json({message: "Lấy danh sách danh mục thành công", data: listCategory});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}