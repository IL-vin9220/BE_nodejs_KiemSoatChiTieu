import { Router } from 'express';
const spendingRoute = Router();
import { 
    getTransactionByPage, 
    AddNewTransaction, 
    updateRecord, 
    softDeleteSpending, 
    searchItemInfor, 
    filterRecord, 
    filterTime, 
    filterCost, 
    checkPlaceBought, 
    checkPlaceByTomTom, 
    getAllDataListFile 
} from '../controllers/spendingController.js';
import authMiddleware from "../middleware/middleware.js"

spendingRoute.get("/get-transaction-by-page", getTransactionByPage);
spendingRoute.put("/add-new", AddNewTransaction);
spendingRoute.put("/update", updateRecord);
spendingRoute.put("/delete", softDeleteSpending);
spendingRoute.get("/search", searchItemInfor);
spendingRoute.post("/filter", filterRecord);
spendingRoute.get("/filter-time", filterTime);
spendingRoute.get("/filter-cost", filterCost);
spendingRoute.get("/check-place-bought", checkPlaceBought);
spendingRoute.get("/check-place-tomtom", checkPlaceByTomTom);

spendingRoute.get("/get-data-file", getAllDataListFile);

export default spendingRoute;
