import { Router } from "express";
let userRoute = Router();
import { editCurrentUser, getUserInfor } from "../controllers/userController.js";

userRoute.put("/edit", editCurrentUser);
userRoute.post("/get-user", getUserInfor);

export default userRoute;