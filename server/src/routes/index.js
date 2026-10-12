import { Router } from "express";
import itemRoutes from "./itemRoutes.js";
import orderRoutes from "./orderRoutes.js";

const router = Router();

router.use("/items", itemRoutes);
router.use("/orders", orderRoutes);

export default router;
