import { z } from "zod";
import { ITEM_CATEGORIES, ITEM_CONDITIONS, ITEM_SORT_OPTIONS } from "../constants/index.js";

export const listItemsQuerySchema = z.object({
  category: z.enum(ITEM_CATEGORIES).optional(),
  search: z.string().trim().min(1).max(100).optional(),
  sort: z.nativeEnum(ITEM_SORT_OPTIONS).optional()
});

export const itemIdParamSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid item id.")
});

export const createItemBodySchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(2000),
  price: z.number().nonnegative(),
  category: z.enum(ITEM_CATEGORIES),
  condition: z.enum(ITEM_CONDITIONS),
  imageUrl: z.string().url(),
  listedBy: z.string().trim().min(1).max(80)
});
