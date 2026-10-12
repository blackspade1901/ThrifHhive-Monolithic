import mongoose from "mongoose";
import { ITEM_CATEGORIES, ITEM_CONDITIONS } from "../constants/index.js";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: ITEM_CATEGORIES },
    condition: { type: String, required: true, enum: ITEM_CONDITIONS },
    imageUrl: { type: String, required: true, trim: true },
    isSold: { type: Boolean, default: false },
    listedBy: { type: String, required: true, trim: true, maxlength: 80 }
  },
  { timestamps: true }
);

itemSchema.index({ category: 1 });
itemSchema.index({ isSold: 1 });
itemSchema.index({ title: "text", description: "text" });

export const Item = mongoose.model("Item", itemSchema);
