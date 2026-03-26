import { Router } from 'express';
const spendingRoute = Router();
import { getAllData, addNewRecord, updateRecord, softDeleteSpending, searchItemInfor, filterDate, filterTime, filterCost, checkPlaceBought, checkPlaceByTomTom, getAllDataListFile } from '../controllers/spendingController.js';

spendingRoute.get("/get-all", getAllData);
spendingRoute.put("/add-new", addNewRecord);
spendingRoute.put("/update", updateRecord);
spendingRoute.put("/delete", softDeleteSpending);
spendingRoute.get("/search", searchItemInfor);
spendingRoute.get("/filter-date", filterDate);
spendingRoute.get("/filter-time", filterTime);
spendingRoute.get("/filter-cost", filterCost);
spendingRoute.get("/check-place-bought", checkPlaceBought);
spendingRoute.get("/check-place-tomtom", checkPlaceByTomTom);

spendingRoute.get("/get-data-file", getAllDataListFile);

export default spendingRoute;
