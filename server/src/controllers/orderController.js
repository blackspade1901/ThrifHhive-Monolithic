import { orderService } from "../services/orderService.js";
import { catchAsync } from "../utils/catchAsync.js";
import { HTTP_STATUS } from "../constants/index.js";

export const orderController = {
  checkout: catchAsync(async (req, res) => {
    const order = await orderService.checkout(req.body);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, data: order, message: "Order placed successfully." });
  })
};
