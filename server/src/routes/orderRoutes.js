import { Router } from "express";
import { orderController } from "../controllers/orderController.js";
import { validate } from "../middleware/validate.js";
import { checkoutBodySchema } from "../validations/orderValidation.js";

const router = Router();

router.post("/checkout", validate(checkoutBodySchema, "body"), orderController.checkout);

export default router;
