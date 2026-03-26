import { Router } from "express";
let categoryRoute = Router();
import { autoCategory, createCategory } from "../controllers/categoryController.js";

categoryRoute.get("/complete-category", autoCategory);
categoryRoute.put("/add-new", createCategory);


export default categoryRoute;