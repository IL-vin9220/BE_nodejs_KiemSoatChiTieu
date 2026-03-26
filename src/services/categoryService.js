import axios from "axios";
import { config } from "dotenv";

config();

import statusCodes from "../config/statusCodes.js";
import AppError from "../config/error.js";

// thêm danh mục
async function addCategory(req){
    try{
        //
    }
    catch{
        throw new AppError("Lỗi thêm danh mục", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

