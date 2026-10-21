import { Router } from "express";
let userRoute = Router();
import { 
    editCurrentUser, 
    getUserInfor, 
    login,
    refreshToken,
    createNewUserController,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/middleware.js"

userRoute.put("/edit", authMiddleware, editCurrentUser);
userRoute.get("/get-user", authMiddleware, getUserInfor);
userRoute.post("/login", login);
router.post("/refresh-token", refreshToken);
userRoute.post("/add-new", createNewUserController);

export default userRoute;