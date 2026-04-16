import { Router } from "express";
let userRoute = Router();
import { editCurrentUser, getUserInfor, login } from "../controllers/userController.js";
import authMiddleware from "../middleware/middleware.js"

userRoute.put("/edit", authMiddleware, editCurrentUser);
userRoute.post("/get-user", authMiddleware, getUserInfor);
userRoute.post("/login", login);

export default userRoute;