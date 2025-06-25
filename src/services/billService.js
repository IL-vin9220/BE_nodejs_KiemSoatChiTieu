let dotenv = require("dotenv");
let axios = require("axios");
let globalStore = require("../stores/globalStore");
let AppError = require("../config/error");
let common = require("../services/commonService");

dotenv.config();

let urlBill = globalStore.directoryBill;
const repoOwner = process.env.GITHUB_USERNAME;
const repoName = process.env.REPO_NAME;

async function addNewItemBill(req, res){
    // lấy ra danh sách file dữ liệu
    let arrayData = await common.getAllDataFile(urlBill);

    // mỗi năm tạo 1 file data json
    let now = new Date();

    if(arrayData.length !== 0){
        
    }
}

