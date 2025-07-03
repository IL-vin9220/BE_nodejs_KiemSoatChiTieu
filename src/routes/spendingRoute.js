const express = require('express');
const router = express.Router();
const spendingController = require('../controllers/spendingController');

router.get("/get-all", spendingController.getAllData);
router.put("/add-new", spendingController.addNewRecord);
router.put("/update", spendingController.updateRecord);
router.put("/delete", spendingController.deleteRecord);
router.get("/search", spendingController.searchItemInfor);
router.get("/filter-date", spendingController.filterDate);
router.get("/filter-time", spendingController.filterTime);
router.get("/filter-cost", spendingController.filterCost);
router.get("/check-place-bought", spendingController.checkPlaceBought);
router.get("/check-place-tomtom", spendingController.checkPlaceByTomTom);

router.get("/get-data-file", spendingController.getAllDataListFile);

module.exports = router;
