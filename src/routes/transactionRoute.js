import { Router } from 'express';
const transactionRoute = Router();
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
    getAllDataListFile,
    listTop10TransactionLast,
    suggestedCategory,
} from '../controllers/transactionController.js';
import authMiddleware from "../middleware/middleware.js"

transactionRoute.get("/get-transaction-by-page", getTransactionByPage);
transactionRoute.put("/add-new", AddNewTransaction);
transactionRoute.put("/update", updateRecord);
transactionRoute.put("/delete", softDeleteSpending);
transactionRoute.get("/search", searchItemInfor);
transactionRoute.post("/filter", filterRecord);
transactionRoute.get("/filter-time", filterTime);
transactionRoute.get("/filter-cost", filterCost);
transactionRoute.get("/check-place-bought", checkPlaceBought);
transactionRoute.get("/check-place-tomtom", checkPlaceByTomTom);
transactionRoute.get("/top10-transaction", listTop10TransactionLast);
transactionRoute.post("/suggested-category", suggestedCategory);

transactionRoute.get("/get-data-file", getAllDataListFile);

export default transactionRoute;
