import SpendingService from '../services/spendingService.js';  // Import Service
import statusCodes from '../config/statusCodes.js';  // Import mã trạng thái
import AppError from "../config/error.js";  // Import lớp lỗi tùy chỉnh
// import commonService from '../services/commonService.js';

// GET /api/user – Lấy danh sách người dùng
export const getAllData = async (res) => {
    try {
        let getAllSpending = await SpendingService.getAllSpending();  // Dùng await nếu hàm trả về Promise
        res.status(statusCodes.OK).json(getAllSpending);  // Trả về dữ liệu
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Có lỗi khi lấy dữ liệu' });
    }
};

export const addNewRecord = async (req, res) => {
    try{
        await SpendingService.AddNewSpending(req);
        res.status(statusCodes.OK).json({message: "Thêm mới bản ghi thành công"});
    }
    catch(error){
        // console.error("Error: ", error);
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

export const updateRecord = async (req, res) => {
    try{
        await SpendingService.UpdateSpending(req);
        res.status(statusCodes.OK).json({message: "Cập nhật bản ghi thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

export const softDeleteSpending = async (req, res) => {
    try{
        await SpendingService.softDeleteSpending(req);
        res.status(statusCodes.OK).json({message: "Xóa bản ghi thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

export const searchItemInfor = async (req, res) => {
    try{
        let searchRes = await SpendingService.searchRecord(req);
        res.status(statusCodes.OK).json({message: "Đã Tìm Thấy Bản Ghi", data: searchRes});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

export const filterRecord = async (req, res) => {
    try{
        // let filterDate = await SpendingService.filterDateRecord(req);
        let dataRequest = req.body;
        let userId = req.user.userId;
        let filterResult = await  SpendingService.filterRecord(dataRequest, userId);
        console.log("data: ", filterResult);
        res.status(statusCodes.OK).json({message: "Lọc bản ghi thành công", data: filterResult??[]});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

export const filterTime = async (req, res) => {
    try{
        let filterTime = await SpendingService.filterTimeRecord(req);
        res.status(statusCodes.OK).json({message: "Lọc bản ghi theo thời gian thành công", data: filterTime});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

export const filterCost = async (req, res) => {
    try{
        let filterCost = await SpendingService.filterCostRecord(req);
        res.status(statusCodes.OK).json({message: "Lọc bản ghi theo giá mua thành công", data: filterCost});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

export const getAllDataListFile = async(req, res) => {
    try{
        let urlString = req.body;
        let listFile = await commonService.getAllDataFile(urlString);
        res.status(statusCodes.OK).json({message: "Lấy danh sách file dữ liệu thành công", data: listFile});
    }
    catch(error){
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Có lỗi khi lấy dữ liệu' });
    }
};

export const checkPlaceBought = async(req, res) => {
    try{
        let textPlace = req.body;
        let placeByTomTom = SpendingService.getListPlaceBought(textPlace);
        res.status(statusCodes.OK).json({message: "Danh sách kết quả nơi mua đã có", data: placeByTomTom});
    }
    catch(error){
        console.error('Lỗi khi lấy dữ liệu nơi mua:', error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Có lỗi khi lấy dữ liệu' });
    }
};

export const checkPlaceByTomTom = async(req, res) => {
    try{
        let textPlace = req.body;
        let placeByTomTom = SpendingService.getListPlaceTomTom(textPlace);
        res.status(statusCodes.OK).json({message: "Danh sách kết quả vị trí", data: placeByTomTom});
    }
    catch(error){
        console.error('Lỗi khi lấy dữ liệu vị trí:', error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Có lỗi khi lấy dữ liệu vị trí' });
    }
};