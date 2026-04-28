import axios from 'axios';
// import SpendingAddRecord from '../dto/request/spendingAddRecordDTO.js';
// import SpendingUpdateRecord from '../dto/request/spendingUpdateRecordDTO.js';

import statusCodes from '../config/statusCodes.js';
import AppError from "../config/error.js";
import transactionRepo from '../repositories/transactionRepo.js';
import transactionDetailRepo from '../repositories/transactionDetailRepo.js';
// import { getAll as _getAll, standardDataBeforePush, pushData } from "./commonService.js";

// lấy tất cả dữ liệu chi tiêu
async function getTransactionByPage(limit, page, userId){
    try{
        limit = limit*page;
        let offset = limit*(page-1);
        let getTransactionByPage = await transactionRepo.getTransactionByPage(limit, offset, userId);
        return getTransactionByPage;
    }
    catch(error){
        console.error(error);
        throw new AppError("Lỗi lấy dữ liệu giao dịch", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// thêm mới bản ghi chi tiêu
async function AddNewTransaction(transactions, userId) {
    try {
        let totalAmount = sumAmounts(transactions.amount);

        let amountArray = transactions.amount.split(",");
        let transactionArray = transactions.name.split(",");
        let maxLength = amountArray.length<transactionArray.length?amountArray.length:transactionArray.length;

        let Code = await getCodeTransaction(maxLength, userId);

        let transactionRoot = {
            "code": Code.transactionCode,
            "amount": totalAmount,
            "time": transactions.time,
            "date": transactions.date,
            "placeName": transactions.placeName,
            "placeLocation": transactions.placeLocation,
            "placeAddress": transactions.placeAddress,
            "note": transactions.note
        }

        // thêm vào db
        let idTransaction = await transactionRepo.addNew(transactionRoot, userId);

        let transactionDetail = {
            "name": transactions.name,
            "amount": transactions.amount,
            "categoryId": transactions.categoryId
        }
        
        await addNewTransactionDetail(
            transactionDetail, 
            Code.transaction_number, 
            Code.transaction_detail_number, 
            idTransaction, 
            Code.transactionDetailCode,
            userId
        );
    } catch (error) {
        console.error('Error:', error.message);
        throw new AppError("Thêm Thất Bại", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// lấy ra dữ liệu setting về mã của người dùng
async function getCodeTransaction(length, userId){
    try{
        // lấy setting về transaction và transaction_detail
        let setting = await transactionRepo.settingTransaction(userId);

        // fallback nếu không có setting
        if (!setting || !setting.transaction_prefix || !setting.transaction_detail_prefix) {
            setting = {
                transaction_prefix: setting.transaction_prefix==null?"T"+ (new Date()).toLocaleDateString('en-US', {month: 'short'}) + (new Date()).getFullYear():setting.transaction_prefix,
                transaction_number: setting.transaction_number,
                transaction_detail_prefix: setting.transaction_detail_prefix==null?"T"+ (new Date()).toLocaleDateString('en-US', {month: 'short'}) + (new Date()).getFullYear() + "D":setting.transaction_detail_prefix,
                transaction_detail_number: setting.transaction_detail_number
            };
        }

        // code cho transaction chính
        const transactionCode = setting.transaction_prefix + setting.transaction_number;

        // generate danh sách detail code
        const transactionDetailCode = Array.from({ length }, (_, i) => {
            return (
            setting.transaction_detail_prefix +
            (setting.transaction_detail_number + i)
            );
        });

        return {
            "transaction_number": setting.transaction_number,
            "transaction_detail_number": setting.transaction_detail_number,
            "transactionCode": transactionCode,
            "transactionDetailCode": transactionDetailCode
        };
    }
    catch(error){
        console.error("error: ", error);
    }
}

// tính tổng amount
function sumAmounts(amountStr) {
    if (!amountStr) return 0;

    return amountStr
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .reduce((sum, val) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return sum; // bỏ qua giá trị lỗi
        return sum + num;
        }, 0);
}

async function addNewTransactionDetail(transactionDetailData, transactionNumber, transactionDetailNumber, idTransaction, transactionDetailCodeList, userId){
    try{
        let amountArray = transactionDetailData.amount.split(",");
        let transactionArray = transactionDetailData.name.split(",");
        let categoryArray = transactionDetailData.categoryId.split(",");

        if(transactionArray.length == amountArray.length){
            for(let i=0; i<=transactionArray.length-1; i++){
                let subTransaction = {
                    "code": transactionDetailCodeList[i],
                    "name": transactionArray[i],
                    "amount": amountArray[i],
                    "categoryId": parseInt(categoryArray[i])
                };

                await transactionDetailRepo.addNew(subTransaction, parseInt(idTransaction.id_transaction));
            }
        }
        else if(amountArray.length == 1){
            for(let i=0; i<=transactionArray.length-1; i++){
                let subTransaction = {
                    "code": transactionDetailCodeList[i],
                    "name": transactionArray[i],
                    "amount": amountArray[0]/(transactionArray.length==0?1:transactionArray.length),
                    "categoryId": parseInt(categoryArray[i])
                };

                await transactionDetailRepo.addNew(subTransaction, parseInt(idTransaction.id_transaction));
            }
        }

        await transactionRepo.updateNumberTrans(transactionNumber+1, transactionDetailNumber+transactionArray.length, userId);
    }
    catch(error){
        console.log(error);
    }
}

// chuyển đổi dữ liệu đầu vào thành định dạng phù hợp với DTO
function convertInputContent(data){
    let dateObject = new Date(data.date);

    let index = data.code;

    let nameSpending = data.name.split(",");
    let costSpending = data.cost.split(",");
    let result = [];

    if(nameSpending.length == costSpending.length){
        result = nameSpending.map((itemName, i) => ({
            "monthProduct":{"month": dateObject.getMonth()+1, "year": dateObject.getFullYear()}, "product": 
            {
                'code': 'P'+
                dateObject.toLocaleDateString('en-US', {month: 'short'})+
                dateObject.getFullYear().toString()+
                (parseInt(index.substring(8,index.length))+1).toString(), // lấy ra id chi tiêu cuối cùng
                'name': (itemName).trim(), 'cost': (costSpending[i].trim()), 'time': data.time, 'date': data.date, 'place': data.place, 'note': data.node, 'category': data.category
            }
        }));
    }
    else if(nameSpending.length > costSpending.length && costSpending.length == 1){
        result = nameSpending.map(itemName => ({
            "monthProduct":{"month": dateObject.getMonth()+1, "year": dateObject.getFullYear()}, "product": 
            {
                'code': 'P'+
                dateObject.toLocaleDateString('en-US', {month: 'short'})+
                dateObject.getFullYear().toString()+
                (parseInt(index.substring(8,index.length))+1).toString(), // lấy ra id chi tiêu cuối cùng
                'name': (itemName).trim(), 'cost': (costSpending[0].trim()), 'time': data.time, 'date': data.date, 'place': data.place, 'note': data.node, 'category': data.category
            }
        }));
    }
    else{
        return -1;
    }

    return result;
}

// cập nhật bản ghi chi tiêu
async function UpdateTransaction(transactionRequest, userId){
    try{
        console.log("transaction request: ", transactionRequest);

        // kiểm tra thông tin đã có chưa
        let AllTransactionDetailCodeByDate = await transactionRepo.getDateExist(transactionRequest, userId);

        let transactionDetail = {
            "code": transactionRequest.transactionDetailCode,
            "name": transactionRequest.name,
            "amount": transactionRequest.amount,
            "categoryId": transactionRequest.categoryId,
            "transactionDetailNote": transactionRequest.note??null,
            "transactionImage": transactionRequest.image??null
        };

        if(AllTransactionDetailCodeByDate.length==0){
            // mảng rỗng => chưa có => thêm mới
            let getCode = await getCodeTransaction(1, userId);

            let newTransaction = {
                "code": getCode.transactionCode,
                "amount": transactionRequest.amount,
                "time": transactionRequest.time,
                "date": transactionRequest.date,
                "placeName": transactionRequest.placeName,
                "placeLocation": transactionRequest.placeLocation,
                "placeAddress": transactionRequest.placeAddress,
                "note": transactionRequest.note,
            };
            console.log("new trans: ", newTransaction)

            // insert transaction + update transaction_id của transaction_detail
            let idTransaction = await transactionRepo.addNew(newTransaction, userId);
            console.log("id: ", idTransaction);
            await transactionDetailRepo.updateIdTransOfTransactionDetail(parseInt(idTransaction.id_transaction), transactionDetail);
        }
        else{
            // mã có => cập nhật cùng cha và khác cha
            // lấy ra thông tin giao dịch từ date, time
            let transactionRecord = await transactionRepo.filterTransactionByDateAndTime((new Date(transactionRequest.date)), (new Date(transactionRequest.date)), transactionRequest.time, userId);
            
            let totalAmountCurrent = parseFloat(transactionRecord.transaction_total_amount) + parseFloat(transactionRequest.trending??0);
            
            // update amount của transaction và update transaction_id của transaction_detail
            let updateTrans = await transactionRepo.updateTotalAmountOfTransactionByTransactionDetailCode(totalAmountCurrent, transactionRecord.id_transaction);

            let returnUpdate = await transactionDetailRepo.updateIdTransOfTransactionDetail(transactionRecord.id_transaction, transactionDetail);
        }
    }
    catch(error){
        console.log("Error: ", error);
        throw new AppError("Lỗi cập nhật bản ghi", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// xóa bản ghi chi tiêu
async function softDeleteSpending(transactionDelete, userId){
    try{
        let transaction = null;

        const hasTransactionCode =
            transactionDelete.transactionCode && transactionDelete.transactionCode.trim() !== "";

        const hasTransactionDetailCode =
            transactionDelete.transactionDetailCode && transactionDelete.transactionDetailCode.trim() !== "";

        if (!hasTransactionCode && !hasTransactionDetailCode) {
            throw new AppError("Không có giá trị để xóa", statusCodes.BAD_REQUEST);
        }

        if (hasTransactionCode) {
            transaction = await transactionRepo.getITransactionFromTransactionCode(transactionDelete.transactionCode, userId);
        }
        else if (hasTransactionDetailCode) {
            transaction = await transactionDetailRepo.getIdTransactionFromTransactionDetailCode(transactionDelete.transactionDetailCode, userId);
        }

        console.log("id: ", transaction);

        // lấy ra ds con cần xóa
        let transactionDetailListActive = await transactionRepo.getAllRecordChildActiveByTransactionId(transaction, userId);
        console.log("transaction detail list: ", transactionDetailListActive);
        console.log("length: ", transactionDetailListActive.length);

        if(transactionDetailListActive.length > 0){
            if(hasTransactionCode){
                await transactionDetailRepo.softDeleteAllTransactionDetail(idTransaction);
            }
            else if(hasTransactionDetailCode){
                await transactionDetailRepo.softDeleteTransactionDetailByCode(transactionDelete.transactionDetailCode, userId);
            }
            return;
        }
        else throw new AppError("Vượt quá số lượng bản ghi để xóa", statusCodes.BAD_LOGIC);
    }
    catch(error){
        if(error instanceof AppError) throw error;

        throw new AppError("Lỗi xóa bản ghi", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// tìm kiếm bản ghi theo code hoặc tên sản phẩm
async function searchRecord(itemSearch, userId){
    try{
        itemSearch = itemSearch?.trim();

        if(!itemSearch){
            throw new AppError("Từ khóa tìm kiếm không hợp lệ", statusCodes.BAD_REQUEST);
        }

        // chỉ tìm kiếm theo tên giao dịch
        let listSearch = transactionDetailRepo.searchTransactionList(itemSearch, userId);

        if(listSearch==0){
            return "Không có bản ghi nào được tìm thấy";
        }

        return listSearch;
    }
    catch(error){
        if(error instanceof AppError) throw error;

        throw new AppError("Lỗi tìm kiếm bản ghi", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// lọc bản ghi theo ngày tháng
async function filterDateRecord(req){
    try{
        // let requestData = req.body;
        // let startDate = new Date(requestData.startDate);
        // let endDate = new Date(requestData.endDate);

        // let getAll = await _getAll(spendingURL);

        // return getAll.filter(record => {
        //     let recordDate = new Date(record.product.date);
        //     return startDate <= recordDate && recordDate <= endDate;
        // });
    }
    catch(error){
        throw new AppError("Lỗi: "+error, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// lọc bản ghi theo thời gian trong ngày
async function filterTimeRecord(req){
    try{
        // let requestData = req.body;

        // let getAll = await _getAll(spendingURL);

        // return getAll.filter(record => {
        //     return record.product.time === requestData.time;
        // });
    }
    catch(error){
        throw new AppError("Lỗi: "+error, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// lọc bản ghi theo khoảng chi phí
async function filterCostRecord(req){
    try{
        // let requestData = req.body;
        // let startCost = parseInt(requestData.startCost);
        // let endCost = parseInt(requestData.endCost);

        // let getAll = await _getAll(spendingURL);

        // return getAll.filter(record => {
        //     let recordCost = parseInt(record.product.cost);
        //     return startCost <= recordCost && recordCost <= endCost;
        // });
    }
    catch(error){
        throw new AppError("Lỗi: "+error, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// lấy danh sách địa điểm mua hàng trong db
async function getListPlaceBought(placeName){
    try{
        // lấy tất cả địa điểm mua hàng trong db
        // let getAllPlace = await 

        // return getAllPlace;
    }
    catch(error){
        throw new AppError("Lỗi: "+error, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

// lấy danh sách địa điểm từ tomtom
async function getListPlaceTomTom(placeName) {
    try{
        let tomtomKey = process.env.TOMTOMAPIKEY;
        const response = await fetch(`https://api.tomtom.com/search/2/search/${encodeURIComponent(placeName)}.json?key=${apiKey}&limit=5`);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            console.log("Không tìm thấy kết quả phù hợp.");
            return []; // Trả về mảng rỗng nếu không có kết quả
        }

        // Duyệt danh sách kết quả và lấy thông tin cần thiết
        let resultSearch = data.results.map(result => ({
            name: result.poi?.name || query,
            location: {
                latitude: result.position?.lat || 0,
                longitude: result.position?.lon || 0
            },
            address: result.address?.freeformAddress || "Không có địa chỉ"
        }));

        let arrayFindMap = [];

        for (let place of resultSearch) {
            // tính khoảng cách
            let route = await getRouteToDestination(place, tomtomKey);
            arrayFindMap.push({
                "placeName": place.name,
                "location": place.location,
                "address": place.address,
                "destination": route==-1? -1: (route.summary.lengthInMeters / 1000).toFixed(2)
            });
        }
    }
    catch(error){
        throw new AppError("Lỗi: "+error, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// lấy ra vị trí hiện tại
async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }),
                error => reject(error)
            );
        } else {
            reject("Trình duyệt không hỗ trợ Geolocation.");
        }
    });
}

// Tính đường đi từ vị trí hiện tại đến địa điểm
async function getRouteToDestination(destination, apiKey) {

    try {
        let currentLocation = await getCurrentLocation();

        let url = `https://api.tomtom.com/routing/1/calculateRoute/${currentLocation.latitude},${currentLocation.longitude}:${destination.location.latitude},${destination.location.longitude}/json?key=${apiKey}&travelMode=car`;

        let response = await fetch(url);
        let data = await response.json();

        if (data.routes && data.routes.length > 0) {
            let route = data.routes[0];
            return route;
        } else {
            // throw new Error("Không tìm thấy đường đi.");
            return -1;
        }
    } catch (error) {
        console.error("Lỗi khi tính toán đường đi:", error);
        return null;
    }
}

// chọn danh mục chi tiêu tự động
async function autoCompleteCategory(spendingList){

    // lấy danh sách các danh mục
    let path = directoryCategory;
    let categoryList = await _getAll(path);

    // lấy ra danh sách tên sản phẩm chi tiêu
    

    // gửi danh sách chatgpt
    let requestChatgpt = `danh sách chi tiêu: ${spendingList}\ndanh sách danh mục chi tiêu: ${categoryList}\ntrả về theo mảng, mỗi phần tử có dạng: {'spendingCode': spendingCode, 'spendingName': spendingName, 'categoryCode': categoryCode, 'categoryName': categoryName}`;

    // trả về danh mục được chọn

}

async function filterRecord(dataRequest, userId){
    let typeTransaction = dataRequest.typeTransaction;
    let now = new Date();
    let startTime = new Date();
    let endTime = new Date();

    if(typeTransaction == "expense"){
        if(dataRequest.time == "thisMonth"){
            startTime = new Date(now.getFullYear, now.getMonth(), 1);
            endTime = new Date(now.getFullYear, now.getMonth()+1, 1);
            let totalAmountTransaction = await transactionRepo.transactionExpenseType(startTime, endTime, userId);
            return totalAmountTransaction;
        }
        else if(dataRequest.time == "thisYear"){
            startTime = new Date(now.getFullYear, 0, 1);
            endTime = new Date(now.getFullYear+1, 0, 1);
            let totalAmountTransaction = await transactionRepo.transactionExpenseType(startTime, endTime, userId);
            return totalAmountTransaction;
        }
    }
    
}

export default { 
    getTransactionByPage,
    AddNewTransaction,
    UpdateTransaction,
    softDeleteSpending,
    // DeleteSpending,
    searchRecord,
    filterDateRecord,
    filterTimeRecord,
    filterCostRecord,
    getListPlaceBought,
    getListPlaceTomTom,
    filterRecord,
};
