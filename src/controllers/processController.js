const commonService = require('../services/commonService');  // Import Service
const statusCodes = require('../config/statusCodes');  // Import mã trạng thái
const AppError = require("../config/error");
let express = require("express");

let route = express.Router();

route.get("/get-data-file", async(req, res) => {
    try{
        let listFile = await commonService.getAllDataFile();
        res.status(statusCodes.OK).json({message: "Lấy danh sách file dữ liệu thành công", data: listFile});
    }
    catch(error){
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Có lỗi khi lấy dữ liệu' });
    }
});