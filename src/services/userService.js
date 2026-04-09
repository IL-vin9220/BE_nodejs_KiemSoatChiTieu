import axios from "axios";
import { config } from "dotenv";
import AppError from "../config/error.js";
import statusCodes from "../config/statusCodes.js";
import userDTO from "../dto/request/userDTO.js";
// import { getAll, standardDataBeforePush, pushData } from "../services/commonService.js";
import UserRepository from "../repositories/userRepo.js"

config();

// thêm mới người dùng
async function createNewUser(req){
    try{
        let newUser = new userDTO();
        newUser.username = req.username;
        newUser.password = req.password;
        newUser.email = req.email;
        newUser.sdt = req.sdt;
        newUser.status = 1;

        return await UserRepository.addNewUser(newUser);
    }
    catch(error){
        throw new AppError("Lỗi tạo mới tài khoản người dùng", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// sửa thông tin người dùng
async function editUser(req){
    try{

        let newUser = new userDTO();
        newUser.username = req.username;
        newUser.password = req.password;
        newUser.email = req.email;
        newUser.sdt = req.sdt;
        newUser.name = req.name;
        newUser.avatar = req.avatar;

        return await UserRepository.updateUser(newUser);

    }
    catch(error){
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
async function getUser(req){
    try{
        let newUser = new userDTO();
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.email = req.body.email;
        newUser.sdt = req.body.sdt;
        newUser.name = req.body.name;
        newUser.avatar = req.body.avatar;

        console.log(req.body);

        return await UserRepository.getUserInfor(newUser);
    }
    catch(error){
        console.log("error: ", error);
        throw new AppError("Lỗi lấy thông tin tài khoản người dùng", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    createNewUser,
    editUser,
    getUser,
};