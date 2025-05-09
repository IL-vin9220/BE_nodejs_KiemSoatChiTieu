let express = require("express");
let route = express.Router();
let categoryService = require("../controllers/categoryController");

route.get("/complete-category", categoryService.autoCategory);
route.put("/add-new", categoryService.createCategory);


module.exports = route;