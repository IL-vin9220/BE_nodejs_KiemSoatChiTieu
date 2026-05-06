import { Router } from "express";
let categoryRoute = Router();
import {
    createCategory,
    updateCategory,
    searchCategory,
    softDeleteCategory,
    getAll,
    getTotalAmountByCategoryTypeExpense
} from "../controllers/categoryController.js";
import authMiddleware from "../middleware/middleware.js"

categoryRoute.put("/add-new", authMiddleware, createCategory);
categoryRoute.put("/update", authMiddleware, updateCategory);
categoryRoute.post("/search", authMiddleware, searchCategory);
categoryRoute.put("/delete", authMiddleware, softDeleteCategory);
categoryRoute.get("/getAll", authMiddleware, getAll);
categoryRoute.get("/total-amount", authMiddleware, getTotalAmountByCategoryTypeExpense);

export default categoryRoute;