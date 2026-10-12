import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    title: { type: String, required: true },
    priceAtPurchase: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    buyerName: { type: String, required: true, trim: true, maxlength: 80 },
    buyerEmail: { type: String, required: true, trim: true, lowercase: true },
    shippingAddress: { type: String, required: true, trim: true, maxlength: 300 },
    paymentMethod: { type: String, required: true, trim: true },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "An order must contain at least one item."
      }
    },
    totalAmount: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
