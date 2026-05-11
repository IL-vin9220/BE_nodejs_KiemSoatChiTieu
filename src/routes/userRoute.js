import { Router } from "express";
let userRoute = Router();
import { 
    editCurrentUser, 
    getUserInfor, 
    login,
    createNewUserController,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/middleware.js"

userRoute.put("/edit", authMiddleware, editCurrentUser);
userRoute.get("/get-user", authMiddleware, getUserInfor);
userRoute.post("/login", login);
userRoute.post("/add-new", createNewUserController);

export default userRoute;