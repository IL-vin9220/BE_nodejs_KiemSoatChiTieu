let axios = require("axios");
let dotenv = require("dotenv");
let AppError = require("../config/error");
let statusCodes = require("../config/statusCodes");
let userDTO = require("../dto/request/userDTO");
let globalStore = require("../stores/globalStore");
let common = require("../services/commonService");


dotenv.config();

const githubToken = process.env.GITHUB_TOKEN;
const repoOwner = process.env.GITHUB_USERNAME;
const repoName = process.env.REPO_NAME;

async function createNewUser(req, res){
    try{
        let response = await getAllDataUser();

        let newUser = new userDTO();
        newUser.username = req.username;
        newUser.pass = req.password;
        newUser.email = req.email;
        newUser.status = 1;
        newUser.index = response[response.length - 1].index;

        response.push(newUser);



    }
    catch(error){
        throw new AppError("Lỗi tạo mới tài khoản người dùng", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function editUser(req, res){
    try{
        let urlAccount = globalStore.directoryAcc;
        let jsonData = await common.getAll(urlAccount);

        let userChange = req.body;

        // console.log(req);

        for(let i=0; i<jsonData.length; i++){
            let user = jsonData[i];
            if(user.index == globalStore.indexUser){
                jsonData[i].username = userChange.username;
                jsonData[i].name = userChange.name;
                jsonData[i].password = userChange.password;
                jsonData[i].email = userChange.email;
                jsonData[i].avatar = userChange.avatar;
                break;
            }
        }

        let standardData = common.standardDataBeforePush(jsonData);

        await common.pushData(urlAccount, standardData);

    }
    catch(error){
        throw new AppError("Lỗi cập nhật thông tin người dùng", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function blockUser(req, res){
    try{
        let urlAccount = globalStore.directoryAcc;
        let jsonData = await common.getAll(urlAccount);

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

        let standardData = common.standardDataBeforePush(jsonData);

        await common.pushData(standardData, urlAccount);

    }
    catch(error){
        throw new AppError("Lỗi Khóa tài khoản người dùng", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createNewUser,
    editUser,
    blockUser,
};