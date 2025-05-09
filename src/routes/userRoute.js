let express = require("express");
let route = express.Router();
let userController = require("../controllers/userController");

route.put("/edit", userController.editCurrentUser);

module.exports = route;