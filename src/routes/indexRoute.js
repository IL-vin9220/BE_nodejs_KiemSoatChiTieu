import { Router } from 'express';
let router = Router();

import spendingRoute from "./spendingRoute.js";
import categoryRoute from "./categoryRoute.js";
import userRoute from "./userRoute.js";

router.use("/spending", spendingRoute);
router.use("/category", categoryRoute);
router.use("/user", userRoute);


export default router;