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
async function createNewUser(req, res){
    try{
        let newUser = new userDTO();
        newUser.username = req.username;
        newUser.password = req.password;
        newUser.email = req.email;
        newUser.sdt = req.sdt;
        newUser.status = 1;

        userRepo.addNewUser(newUser);
    }
    catch(error){
        throw new AppError("Lỗi tạo mới tài khoản người dùng", INTERNAL_SERVER_ERROR);
    }
}

// sửa thông tin người dùng
async function editUser(req, res){
    try{
        let urlAccount = directoryAcc;
        let jsonData = await getAll(urlAccount);

        let userChange = req.body;

        // console.log(req);

        for(let i=0; i<jsonData.length; i++){
            let user = jsonData[i];
            if(user.index == indexUser){
                jsonData[i].username = userChange.username;
                jsonData[i].name = userChange.name;
                jsonData[i].password = userChange.password;
                jsonData[i].email = userChange.email;
                jsonData[i].avatar = userChange.avatar;
                break;
            }
        }


        let standardData = await standardDataBeforePush(urlAccount, jsonData);

        await pushData(urlAccount, standardData);
        // return jsonData;

    }
    catch(error){
        throw new AppError("Lỗi cập nhật thông tin người dùng", INTERNAL_SERVER_ERROR);
    }
}

// khóa tài khoản người dùng
async function blockUser(req, res){
    try{
        let urlAccount = directoryAcc;
        let jsonData = await getAll(urlAccount);

        let listIndexUserBlocked = req.body;

        for(let subIndex of listIndexUserBlocked){
            for(let i=0; i<jsonData.length; i++){
                let user = jsonData[i];
                if(user.index == subIndex){
                    jsonData[i].status = 0;
                    break;
                }
            }
        }

        let standardData = standardDataBeforePush(jsonData);

        await pushData(standardData, urlAccount);

    }
    catch(error){
        throw new AppError("Lỗi Khóa tài khoản người dùng", INTERNAL_SERVER_ERROR);
    }
}

// lấy thông tin người dùng
async function getUser(req, res){
    try{
        let urlAccount = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.REPO_NAME}/contents/data/Account/account.json`;
        let jsonData = await getAll(urlAccount);

        let user = req.body;
        for(let i=0; i<jsonData.length; i++){
            if(user.username == jsonData[i].username && user.password == jsonData[i].password){
                return{
                    "username": jsonData[i].username,
                    "password": jsonData[i].password,
                    "email": jsonData[i].email,
                    "status": jsonData[i].status,
                    "name": jsonData[i].name,
                    "google": jsonData[i].google,
                    "facebook": jsonData[i].facebook,
                    "avatar": jsonData[i].avatar,
                    "createDate": jsonData[i].createDate,
                    "index": jsonData[i].index
                };
            }
        }
    }
    catch(error){
        throw new AppError("Lỗi lấy thông tin tài khoản người dùng", INTERNAL_SERVER_ERROR);
    }
}

export default {
    createNewUser,
    editUser,
    blockUser,
    getUser,
};