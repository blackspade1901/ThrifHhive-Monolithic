import { Router } from "express";
import { itemController } from "../controllers/itemController.js";
import { validate } from "../middleware/validate.js";
import {
  listItemsQuerySchema,
  itemIdParamSchema,
  createItemBodySchema
} from "../validations/itemValidation.js";

const router = Router();

router.get("/", validate(listItemsQuerySchema, "query"), itemController.listItems);

router.get(
  "/:id",
  validate(itemIdParamSchema, "params"),
  itemController.getItemById
);

router.post("/", validate(createItemBodySchema, "body"), itemController.listNewItem);

export default router;
