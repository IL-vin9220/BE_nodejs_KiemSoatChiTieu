let statusCodes = require("../config/statusCodes");
let userService = require("../services/userService");

exports.editCurrentUser = async(req, res) => {
    try{
        await userService.editUser(req, res);
        res.status(statusCodes.OK).json({message: "Cập nhật thông tin user thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

exports.createNewUser = async(req, res) => {
    try{
        await userService.createNewUser(req, res);
        res.status(statusCodes.OK).json({message: "Thêm tài khoản người dùng mới thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

exports.blockUser = async(req, res) => {
    try{
        await userService.blockUser(req, res);
        res.status(statusCodes.OK).json({message: "Khóa tài khoản người dùng thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};