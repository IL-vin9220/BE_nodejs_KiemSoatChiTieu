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

transactionRoute.get("/get-transaction-by-page", authMiddleware, getTransactionByPage);
transactionRoute.put("/add-new", authMiddleware, AddNewTransaction);
transactionRoute.put("/update", authMiddleware, updateRecord);
transactionRoute.put("/delete", authMiddleware, softDeleteSpending);
transactionRoute.get("/search", authMiddleware, searchItemInfor);
transactionRoute.post("/filter", authMiddleware, filterRecord);
transactionRoute.get("/filter-time", authMiddleware, filterTime);
transactionRoute.get("/filter-cost", authMiddleware, filterCost);
transactionRoute.get("/check-place-bought", authMiddleware, checkPlaceBought);
transactionRoute.get("/check-place-tomtom", authMiddleware, checkPlaceByTomTom);
transactionRoute.get("/top10-transaction", authMiddleware, listTop10TransactionLast);
transactionRoute.post("/suggested-category", suggestedCategory);

transactionRoute.get("/get-data-file", authMiddleware, getAllDataListFile);

export default transactionRoute;
