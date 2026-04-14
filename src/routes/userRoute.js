import { Router } from "express";
let userRoute = Router();
import { editCurrentUser, getUserInfor, login } from "../controllers/userController.js";
import authMiddleware from "../middleware/middleware.js"

userRoute.put("/edit", editCurrentUser);
userRoute.post("/get-user", getUserInfor);
userRoute.post("/login", login);

export default userRoute;