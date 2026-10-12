import { Order } from "../models/Order.js";
import mongoose from "mongoose";

export const orderRepository = {
  async create(orderData, session) {
    const [created] = await Order.create([orderData], { session });
    return created.toObject();
  },

  async findById(id) {
    return Order.findById(id).lean();
  },

  async startSession() {
    return mongoose.startSession();
  }
};
