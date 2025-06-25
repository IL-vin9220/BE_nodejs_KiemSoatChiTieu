let express = require("express");
let route = express.Router();
let userController = require("../controllers/userController");

route.put("/edit", userController.editCurrentUser);
route.get("/get-user", userController.getUserInfor);

module.exports = route;