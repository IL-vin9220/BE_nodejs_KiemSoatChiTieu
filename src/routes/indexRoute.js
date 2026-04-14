import { Router } from 'express';
let router = Router();

import spendingRoute from "./spendingRoute.js";
import categoryRoute from "./categoryRoute.js";
import userRoute from "./userRoute.js";
import walletRoute from './walletRoute.js';

router.use("/spending", spendingRoute);
router.use("/category", categoryRoute);
router.use("/user", userRoute);
router.use("/wallet", walletRoute);


export default router;