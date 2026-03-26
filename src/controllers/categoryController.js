// import { autoCompleteCategory } from "../services/categoryService.js";
import statusCodes from "../config/statusCodes.js";
import AppError from "../config/error.js";

export async function autoCategory(req, res) {
    try{
        // let category = await autoCompleteCategory(req, res);
        // res.status(statusCodes.OK).json({message: "Xác định danh mục thành công", data: category});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function createCategory(req, res) {
    try{

    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}