import statusCodes from "../config/statusCodes.js";
import userServices from "../services/userService.js";
import AppError from "../config/error.js";

export async function editCurrentUser(req, res) {
    try{
        await userServices.editUser(req, res);
        res.status(statusCodes.OK).json({message: "Cập nhật thông tin user thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function getUserInfor(req,res) {
    try{
        let currentUser = await userServices.getUser(req, res);
        res.status(statusCodes.OK).json({message: "Thông tin người dùng", data: currentUser});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function createNewUserController(req, res) {
    try{
        await userServices.createNewUser(req, res);
        res.status(statusCodes.OK).json({message: "Thêm tài khoản người dùng mới thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function login(req, res){
    try{
        let requestLogin = userServices.login(req);

        console.log("set cookie");
        res.cookie("accessToken", requestLogin.token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 60*60*1000
        });

        res.json({message: "Login Thành Công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

// export async function blockUserController(req, res) {
//     try{
//         await blockUser(req, res);
//         res.status(statusCodes.OK).json({message: "Khóa tài khoản người dùng thành công"});
//     }
//     catch(error){
//         const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
//         res.status(status).json({ error: error.message || "Lỗi server!" });
//     }
// }