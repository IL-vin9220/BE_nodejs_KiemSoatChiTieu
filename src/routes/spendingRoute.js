import { Router } from 'express';
const spendingRoute = Router();
import { getAllData, addNewRecord, updateRecord, softDeleteSpending, searchItemInfor, filterRecord, filterTime, filterCost, checkPlaceBought, checkPlaceByTomTom, getAllDataListFile } from '../controllers/spendingController.js';
import authMiddleware from "../middleware/middleware.js"

spendingRoute.get("/get-all", authMiddleware, getAllData);
spendingRoute.put("/add-new", authMiddleware, addNewRecord);
spendingRoute.put("/update", authMiddleware, updateRecord);
spendingRoute.put("/delete", authMiddleware, softDeleteSpending);
spendingRoute.get("/search", authMiddleware, searchItemInfor);
spendingRoute.post("/filter", authMiddleware, filterRecord);
spendingRoute.get("/filter-time", authMiddleware, filterTime);
spendingRoute.get("/filter-cost", authMiddleware, filterCost);
spendingRoute.get("/check-place-bought", authMiddleware, checkPlaceBought);
spendingRoute.get("/check-place-tomtom", authMiddleware, checkPlaceByTomTom);

spendingRoute.get("/get-data-file", authMiddleware, getAllDataListFile);

export default spendingRoute;
