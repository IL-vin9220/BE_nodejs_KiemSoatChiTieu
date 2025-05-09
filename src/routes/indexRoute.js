let express = require('express');
let router = express.Router();

let spendingRoutes = require("./spendingRoute");
let categoryRoutes = require("./categoryRoute");
let userRoutes = require("./userRoute");

router.use("/spending", spendingRoutes);
router.use("/category", categoryRoutes);
router.use("/user", userRoutes);


module.exports = router;