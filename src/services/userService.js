import axios from "axios";
import { config } from "dotenv";
import AppError from "../config/error";
import { INTERNAL_SERVER_ERROR } from "../config/statusCodes";
import userDTO from "../dto/request/userDTO";
import { directoryAcc, indexUser } from "../stores/globalStore";
import { getAll, standardDataBeforePush, pushData } from "../services/commonService";
import userRepo from "../repositories/userRepo.js"

config();

// const githubToken = process.env.GITHUB_TOKEN;
// const repoOwner = process.env.GITHUB_USERNAME;
// const repoName = process.env.REPO_NAME;

// thêm mới người dùng
async function createNewUser(req){
    try{
        let newUser = new userDTO();
        newUser.username = req.username;
        newUser.password = req.password;
        newUser.email = req.email;
        newUser.sdt = req.sdt;
        newUser.status = 1;

        return await userRepo.addNewUser(newUser);
    }
    catch(error){
        throw new AppError("Lỗi tạo mới tài khoản người dùng", INTERNAL_SERVER_ERROR);
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

        return await userRepo.updateUser(newUser);

    }
    catch(error){
        throw new AppError("Lỗi cập nhật thông tin người dùng", INTERNAL_SERVER_ERROR);
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
//         throw new AppError("Lỗi Khóa tài khoản người dùng", INTERNAL_SERVER_ERROR);
//     }
// }

// lấy thông tin người dùng
async function getUser(req){
    try{
        let newUser = new userDTO();
        newUser.username = req.username;
        newUser.password = req.password;
        newUser.email = req.email;
        newUser.sdt = req.sdt;
        newUser.name = req.name;
        newUser.avatar = req.avatar;

        return await userRepo.getUserInfor(newUser);
    }
    catch(error){
        throw new AppError("Lỗi lấy thông tin tài khoản người dùng", INTERNAL_SERVER_ERROR);
    }
}

export default {
    createNewUser,
    editUser,
    getUser,
};