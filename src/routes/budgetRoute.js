import { Router } from "express";
import authMiddleware from "../middleware/middleware.js";
import {
    getAllBudget,
    createBudget,
    updateBudget,
    softDeletedBudget,
} from '../controllers/budgetController.js';

let budgetRoute = Router();

budgetRoute.get('/get-all', authMiddleware, getAllBudget);
budgetRoute.put('/create', authMiddleware, createBudget);
budgetRoute.put('/update', authMiddleware, updateBudget);
budgetRoute.put('/delete', authMiddleware, softDeletedBudget);

export default budgetRoute;