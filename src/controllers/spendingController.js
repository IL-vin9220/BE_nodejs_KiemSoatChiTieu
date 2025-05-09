const SpendingService = require('../services/spendingService');  // Import Service
// const SpendingDTO = require('../dto/request/spendingDTO');  // Import DTO
const statusCodes = require('../config/statusCodes');  // Import mã trạng thái
const AppError = require("../config/error");
const commonService = require('../services/commonService');

// GET /api/user – Lấy danh sách người dùng
exports.getAllData = async (req, res) => {
    try {
        let getAllSpending = await SpendingService.getAllSpending();  // Dùng await nếu hàm trả về Promise
        res.status(statusCodes.OK).json(getAllSpending);  // Trả về dữ liệu
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Có lỗi khi lấy dữ liệu' });
    }
};

exports.addNewRecord = async (req, res) => {
    try{
        await SpendingService.AddNewSpending(req, res);
        res.status(statusCodes.OK).json({message: "Thêm mới bản ghi thành công"});
    }
    catch(error){
        // console.error("Error: ", error);
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

exports.updateRecord = async (req, res) => {
    try{
        await SpendingService.UpdateSpending(req, res);
        res.status(statusCodes.OK).json({message: "Cập nhật bản ghi thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

exports.deleteRecord = async (req, res) => {
    try{
        await SpendingService.DeleteSpending(req, res);
        res.status(statusCodes.OK).json({message: "Xóa bản ghi thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

exports.searchItemInfor = async (req, res) => {
    try{
        let searchRes = await SpendingService.searchRecord(req, res);
        res.status(statusCodes.OK).json({message: "Đã Tìm Thấy Bản Ghi", data: searchRes});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

exports.filterDate = async (req, res) => {
    try{
        let filterDate = await SpendingService.filterDateRecord(req, res);
        res.status(statusCodes.OK).json({message: "Lọc bản ghi theo ngày thành công", data: filterDate});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

exports.filterTime = async (req, res) => {
    try{
        let filterTime = await SpendingService.filterTimeRecord(req, res);
        res.status(statusCodes.OK).json({message: "Lọc bản ghi theo ngày thành công", data: filterTime});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

exports.filterCost = async (req, res) => {
    try{
        let filterCost = await SpendingService.filterCostRecord(req, res);
        res.status(statusCodes.OK).json({message: "Lọc bản ghi theo giá mua thành công", data: filterCost});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

exports.getAllDataListFile = async(req, res) => {
    try{
        let listFile = await commonService.getAllDataFile();
        res.status(statusCodes.OK).json({message: "Lấy danh sách file dữ liệu thành công", data: listFile});
    }
    catch(error){
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Có lỗi khi lấy dữ liệu' });
    }
};
