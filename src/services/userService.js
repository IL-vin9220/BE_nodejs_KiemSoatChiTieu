import axios from "axios";
import { config } from "dotenv";
import AppError from "../config/error.js";
import statusCodes from "../config/statusCodes.js";
import userDTO from "../dto/request/userDTO.js";
import { generateToken } from "../utils/jwt.js";
// import { getAll, standardDataBeforePush, pushData } from "../services/commonService.js";
import UserRepository from "../repositories/userRepo.js"

config();

// thêm mới người dùng
async function createNewUser(user){
    try{
        console.log("------------------------");
        let newUser = await UserRepository.addNewUser(user);
        console.log(newUser);

        return newUser;
    }
    catch(error){
        console.log(error);
        if (error.code === '23505') {
            throw new Error("Tài khoản người dùng đã tồn tại");
        }
        throw new AppError("Lỗi tạo mới tài khoản người dùng", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// sửa thông tin người dùng
async function editUser(userData, userId){
    try{
        let userNew = await UserRepository.updateUser(userData, userId);
        return userNew;
    }
    catch(error){
        console.log(error);
        throw new AppError("Lỗi cập nhật thông tin người dùng", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// khóa tài khoản người dùng - chức năng chỉ dùng cho admin
// async function blockUser(req, res){
//     try{
//         let urlAccount = directoryAcc;
//         let jsonData = await getAll(urlAccount);

//         let listIndexUserBlocked = req.body;

//         for(let subIndex of listIndexUserBlocked){
//             for(let i=0; i<jsonData.length; i++){
//                 let user = jsonData[i];
//                 if(user.index == subIndex){
//                     jsonData[i].status = 0;
//                     break;
//                 }
//             }
//         }

//         let standardData = standardDataBeforePush(jsonData);

//         await pushData(standardData, urlAccount);

//     }
//     catch(error){
//         throw new AppError("Lỗi Khóa tài khoản người dùng", statusCodes.INTERNAL_SERVER_ERROR);
//     }
// }

// lấy thông tin người dùng
async function getUser(userId){
    try{
        return await UserRepository.getUserInfor(userId);
    }
    catch(error){
        console.log("error: ", error);
        throw new AppError("Lỗi lấy thông tin tài khoản người dùng", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function login(userRequest){
    try{
        let userLogin = new userDTO();
        userLogin.username = userRequest.username;
        userLogin.password = userRequest.password;

        // query db
        let isSuccess = await UserRepository.getUserInfor(userLogin);

        if(!isSuccess) return;

        let token = generateToken({
            userId: isSuccess.id,
        });

        return {token};
    }
    catch(error) {
        console.error("LOGIN ERROR:", error);

        throw new AppError(
            "Lỗi lấy thông tin tài khoản người dùng",
            statusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

export default {
    createNewUser,
    editUser,
    getUser,
    login,
};