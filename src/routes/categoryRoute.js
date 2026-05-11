import { Router } from "express";
let categoryRoute = Router();
import {
    createCategory,
    updateCategory,
    searchCategory,
    softDeleteCategory,
    getAll,
    getTotalAmountByCategoryTypeExpense,
    getCategoryNameList
} from "../controllers/categoryController.js";
import authMiddleware from "../middleware/middleware.js"

categoryRoute.put("/add-new", createCategory);
categoryRoute.put("/update", updateCategory);
categoryRoute.post("/search", searchCategory);
categoryRoute.put("/delete", softDeleteCategory);
categoryRoute.get("/get-all", getAll);
categoryRoute.get("/total-amount", getTotalAmountByCategoryTypeExpense);
categoryRoute.get("/name-list", getCategoryNameList);

export default categoryRoute;