import statusCodes from "../config/statusCodes.js";
import userServices from "../services/userService.js";
import AppError from "../config/error.js";

// cấu hình cookie dùng chung
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/"
};

export async function editCurrentUser(req, res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let userDataEdit = req.body;
        await userServices.editUser(userDataEdit, userId);
        res.status(statusCodes.OK).json({message: "Cập nhật thông tin user thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function getUserInfor(req,res) {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let currentUser = await userServices.getUser(userId);
        res.status(statusCodes.OK).json({message: "Thông tin người dùng", data: currentUser});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

export async function createNewUserController(req, res) {
    try{
        let dataRequest = req.body;
        await userServices.createNewUser(dataRequest);
        res.status(statusCodes.OK).json({message: "Thêm tài khoản người dùng mới thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
}

// POST /api/user/login
export const login = async (req, res) => {
    try {
        const result = await userServices.login(req.body);

        if (!result) {
            return res.status(401).json({
                error: "Sai tài khoản hoặc mật khẩu"
            });
        }

        // Access Token - 1 giờ
        res.cookie("accessToken", result.token, {
            ...cookieOptions,
            maxAge: 60 * 60 * 1000
        });

        // Refresh Token - session cookie
        res.cookie("refreshToken", result.refreshToken, {
            ...cookieOptions
        });

        return res.status(200).json({
            message: "Login Thành Công"
        });

    } catch (error) {
        console.error("LOGIN CONTROLLER ERROR:", error);

        return res.status(500).json({
            error: "Lỗi đăng nhập"
        });
    }
};

// POST /api/user/refresh-token
export const refreshToken = async (req, res) => {
    try {
        const refreshTokenValue = req.cookies?.refreshToken;

        if (!refreshTokenValue) {
            return res.status(401).json({
                error: "Không tìm thấy Refresh Token"
            });
        }

        const result = await userServices.refreshToken(
            refreshTokenValue
        );

        res.cookie("accessToken", result.token, {
            ...cookieOptions,
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Refresh Token thành công"
        });

    } catch (error) {
        console.error("REFRESH TOKEN ERROR:", error.message);

        return res.status(401).json({
            error: "Refresh Token không hợp lệ"
        });
    }
};

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