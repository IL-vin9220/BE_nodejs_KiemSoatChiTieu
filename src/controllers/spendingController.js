import transactionServices from '../services/transactionService.js';  // Import Service
import statusCodes from '../config/statusCodes.js';  // Import mã trạng thái
import AppError from "../config/error.js";  // Import lớp lỗi tùy chỉnh
// import commonService from '../services/commonService.js';

// GET /api/user – Lấy danh sách người dùng
export const getTransactionByPage = async (req, res) => {
    try {
        // let userId = req.user.userId;;
        let userId = 1;
        let limit = parseInt(req.query.limit, 10);
        let page = parseInt(req.query.page, 10);

        // default fallback
        if (isNaN(limit) || limit <= 0) limit = 10;
        if (isNaN(page) || page <= 0) page = 1;

        let getTransaction_ByPage = await transactionServices.getTransactionByPage(limit, page, userId);  // Dùng await nếu hàm trả về Promise
        res.status(statusCodes.OK).json({message: "Lấy bản ghi giao dịch thành công", data: getTransaction_ByPage});  // Trả về dữ liệu
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Có lỗi khi lấy dữ liệu' });
    }
};

export const AddNewTransaction = async (req, res) => {
    try{
        // let userId = req.user.userId;
        let userId = 1;
        let transactionRequest = req.body;
        await transactionServices.AddNewTransaction(transactionRequest, userId);
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
        await transactionServices.UpdateSpending(req);
        res.status(statusCodes.OK).json({message: "Cập nhật bản ghi thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

export const softDeleteSpending = async (req, res) => {
    try{
        await transactionServices.softDeleteSpending(req);
        res.status(statusCodes.OK).json({message: "Xóa bản ghi thành công"});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

export const searchItemInfor = async (req, res) => {
    try{
        let searchRes = await transactionServices.searchRecord(req);
        res.status(statusCodes.OK).json({message: "Đã Tìm Thấy Bản Ghi", data: searchRes});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

export const filterRecord = async (req, res) => {
    try{
        // let filterDate = await transactionServices.filterDateRecord(req);
        let dataRequest = req.body;
        let userId = req.user.userId;
        let filterResult = await  transactionServices.filterRecord(dataRequest, userId);
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
        let filterTime = await transactionServices.filterTimeRecord(req);
        res.status(statusCodes.OK).json({message: "Lọc bản ghi theo thời gian thành công", data: filterTime});
    }
    catch(error){
        const status = error instanceof AppError && error.statusCode ? error.statusCode : 500;
        res.status(status).json({ error: error.message || "Lỗi server!" });
    }
};

export const filterCost = async (req, res) => {
    try{
        let filterCost = await transactionServices.filterCostRecord(req);
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
        let placeByTomTom = transactionServices.getListPlaceBought(textPlace);
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
        let placeByTomTom = transactionServices.getListPlaceTomTom(textPlace);
        res.status(statusCodes.OK).json({message: "Danh sách kết quả vị trí", data: placeByTomTom});
    }
    catch(error){
        console.error('Lỗi khi lấy dữ liệu vị trí:', error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Có lỗi khi lấy dữ liệu vị trí' });
    }
};