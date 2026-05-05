import { Router } from 'express';
let router = Router();

import transactionRoute from "./transactionRoute.js";
import categoryRoute from "./categoryRoute.js";
import userRoute from "./userRoute.js";
import walletRoute from './walletRoute.js';
import fundRoute from './fundRoute.js';

router.use("/transaction", transactionRoute);
router.use("/category", categoryRoute);
router.use("/user", userRoute);
router.use("/wallet", walletRoute);
router.use("/fund", fundRoute);


export default router;