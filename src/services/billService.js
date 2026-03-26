import { config } from "dotenv";
import axios from "axios";
import { directoryBill } from "../stores/globalStore.js";
import AppError from "../config/error.js";
import { getAllDataFile } from "../services/commonService.js";

config();

async function addNewItemBill(req, res){
    // lấy ra danh sách file dữ liệu
    // let arrayData = await getAllDataFile(urlBill);

    // // mỗi năm tạo 1 file data json
    // let now = new Date();

    // if(arrayData.length !== 0){
        
    // }
}

