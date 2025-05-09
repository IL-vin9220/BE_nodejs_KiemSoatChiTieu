let categoryService = require("../services/categoryService");
let statusCodes = require("../config/statusCodes");
let AppError = require("../config/error");

exports.autoCategory = async (req, res) => {
    try{
        let category = await categoryService.autoCompleteCategory(req, res);
        res.status(statusCodes.OK).json({message: "Xác định danh mục thành công", data: category});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

exports.createCategory = async(req, res) => {
    try{

    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};