import { Router } from 'express';
let router = Router();

import transactionRoute from "./transactionRoute.js";
import categoryRoute from "./categoryRoute.js";
import userRoute from "./userRoute.js";
import walletRoute from './walletRoute.js';

router.use("/transaction", transactionRoute);
router.use("/category", categoryRoute);
router.use("/user", userRoute);
router.use("/wallet", walletRoute);


export default router;