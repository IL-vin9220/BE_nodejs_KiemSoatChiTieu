import { Router } from "express";
import authMiddleware from "../middleware/middleware.js";
import {
    getAllBudget,
    createBudget,
    updateBudget,
    softDeletedBudget,
} from '../controllers/budgetController.js';

let budgetRoute = Router();

budgetRoute.get('/get-all', getAllBudget);
budgetRoute.put('/create', createBudget);
budgetRoute.put('/update', updateBudget);
budgetRoute.put('/delete', softDeletedBudget);

export default budgetRoute;