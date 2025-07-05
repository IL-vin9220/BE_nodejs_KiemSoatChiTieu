const axios = require('axios');
const dotenv = require('dotenv');  // Import dotenv

dotenv.config();  // Load biến môi trường từ .env file

const SpendingDTO = require('../dto/request/spendingDTO');  // Import DTO
const statusCodes = require('../config/statusCodes');
const AppError = require("../config/error");
let commonJS = require("./commonService");
let globalStore = require("../stores/globalStore");

// Lấy thông tin từ .env
const githubToken = process.env.GITHUB_TOKEN;
const repoOwner = process.env.GITHUB_USERNAME;
const repoName = process.env.REPO_NAME;

const spendingURL = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/Database/User2/data1.json`;

async function getAllSpending(){
    try{
        return await commonJS.getAll(spendingURL);
    }
    catch(error){
        throw new AppError("Lỗi lấy dữ liệu chi tiêu", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// Push file JSON lên GitHub
async function AddNewSpending(req, res) {
    try {
        let originData = req.body;        

        // chuyển đổi lại data
        originData = convertInputContent(originData);

        if(originData == -1){
            throw new AppError("Lỗi chuyển đổi dữ liệu", statusCodes.INTERNAL_SERVER_ERROR);
        }

        // get all data spending
        let getAll = await commonJS.getAll(spendingURL);

        originData.forEach(item => {
            getAll.push(item);
        });

        // console.log(getAll);
    
        let data = await commonJS.standardDataBeforePush(spendingURL, getAll);
        
        await commonJS.pushData(spendingURL, data);

    } catch (error) {
        // console.error('Error pushing to GitHub:', error.message);
        throw new AppError("Thêm Thất Bại", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

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

// cập nhật bản ghi
async function UpdateSpending(req, res){
    try{
        let requestData = req.body;

        let getAll = await commonJS.getAll(spendingURL);

        for(let i=0; i<getAll.length; i++){
            let item = getAll[i];
            if(item.product.code === requestData.code){
                getAll[i].product.name = requestData.name;
                getAll[i].product.cost = requestData.cost;
                getAll[i].product.time = requestData.time;
                getAll[i].product.date = requestData.date;
                getAll[i].product.place = requestData.place;
                getAll[i].product.note = requestData.note;
                getAll[i].product.category = requestData.category;
                break;
            }
        }

        let data = await commonJS.standardDataBeforePush(spendingURL, getAll);

        await commonJS.pushData(spendingURL, data);
    }
    catch(error){
        // console.log("Error: ", error);
        throw new AppError("Lỗi cập nhật bản ghi", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// xóa bản ghi
async function DeleteSpending(req, res){
    try{
        let requestData = req.body;

        let getAll = await commonJS.getAll(spendingURL);

        for(let subCode of requestData){
            getAll = getAll.filter(record => record.product.code !== subCode);
        }

        let data = await commonJS.standardDataBeforePush(spendingURL, getAll);

        await commonJS.pushData(spendingURL, data);
    }
    catch(error){
        throw new AppError("Lỗi xóa bản ghi", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// tìm kiếm bản ghi
async function searchRecord(req, res){
    try{
        let requestData = req.body;

        let getAll = await commonJS.getAll(spendingURL);

        if(requestData.type === "code"){
            return getAll.filter(item => item.product.code === requestData.code);
        }
        else{
            // type : name
            return getAll.filter(item => item.product.name === requestData.name);
        }
    }
    catch(error){
        throw new AppError("Lỗi tìm kiếm bản ghi", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// lọc
async function filterDateRecord(req, res){
    try{
        let requestData = req.body;
        let startDate = new Date(requestData.startDate);
        let endDate = new Date(requestData.endDate);

        let getAll = await commonJS.getAll(spendingURL);

        return getAll.filter(record => {
            let recordDate = new Date(record.product.date);
            return startDate <= recordDate && recordDate <= endDate;
        });
    }
    catch(error){
        throw new AppError("Lỗi: "+error, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function filterTimeRecord(req, res){
    try{
        let requestData = req.body;

        let getAll = await commonJS.getAll(spendingURL);

        return getAll.filter(record => {
            return record.product.time === requestData.time;
        });
    }
    catch(error){
        throw new AppError("Lỗi: "+error, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function filterCostRecord(req, res){
    try{
        let requestData = req.body;
        let startCost = parseInt(requestData.startCost);
        let endCost = parseInt(requestData.endCost);

        let getAll = await commonJS.getAll(spendingURL);

        return getAll.filter(record => {
            let recordCost = parseInt(record.product.cost);
            return startCost <= recordCost && recordCost <= endCost;
        });
    }
    catch(error){
        throw new AppError("Lỗi: "+error, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getListPlaceBought(placeName){
    try{
        
    }
    catch(error){
        throw new AppError("Lỗi: "+error, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

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
    let path = globalStore.directoryCategory;
    let categoryList = await commonJS.getAll(path);

    // lấy ra danh sách tên sản phẩm chi tiêu
    

    // gửi danh sách chatgpt
    let requestChatgpt = `danh sách chi tiêu: ${spendingList}\ndanh sách danh mục chi tiêu: ${categoryList}\ntrả về theo mảng, mỗi phần tử có dạng: {'spendingCode': spendingCode, 'spendingName': spendingName, 'categoryCode': categoryCode, 'categoryName': categoryName}`;

    // trả về danh mục được chọn

}

module.exports = { 
    getAllSpending,
    AddNewSpending,
    UpdateSpending,
    DeleteSpending,
    searchRecord,
    filterDateRecord,
    filterTimeRecord,
    filterCostRecord,
    getListPlaceBought,
    getListPlaceTomTom,
};
