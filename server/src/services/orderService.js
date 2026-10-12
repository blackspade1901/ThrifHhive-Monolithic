import { itemRepository } from "../repositories/itemRepository.js";
import { orderRepository } from "../repositories/orderRepository.js";
import { AppError } from "../utils/AppError.js";
import { HTTP_STATUS, ERROR_CODES } from "../constants/index.js";

/**
 * Checkout is the one operation in this app where a partial failure would
 * leave data inconsistent (items marked sold with no matching order, or vice
 * versa). We wrap it in a Mongo session/transaction so either everything
 * commits or nothing does.
 *
 * Tradeoff, documented deliberately: multi-document transactions require the
 * MongoDB deployment to be a replica set. MongoDB Atlas (including the free
 * tier) provisions clusters as replica sets by default, so this works there
 * out of the box. If this were pointed at a single standalone `mongod`
 * instance, transactions would not be available — that's the scenario this
 * project explicitly avoids by requiring Atlas (see README/.env.example)
 * rather than a local install.
 */
export const orderService = {
  async checkout({ buyerName, buyerEmail, shippingAddress, paymentMethod, itemIds }) {
    const session = await orderRepository.startSession();

    try {
      let createdOrder;

      await session.withTransaction(async () => {
        const items = await itemRepository.findByIds(itemIds);

        if (items.length !== itemIds.length) {
          throw new AppError(
            "One or more items could not be found.",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.NOT_FOUND
          );
        }

        const alreadySold = items.find((item) => item.isSold);
        if (alreadySold) {
          throw new AppError(
            `"${alreadySold.title}" has already been sold.`,
            HTTP_STATUS.CONFLICT,
            ERROR_CODES.ITEM_ALREADY_SOLD
          );
        }

        const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

        const orderData = {
          buyerName,
          buyerEmail,
          shippingAddress,
          paymentMethod,
          totalAmount,
          items: items.map((item) => ({
            item: item._id,
            title: item.title,
            priceAtPurchase: item.price
          }))
        };

        createdOrder = await orderRepository.create(orderData, session);

        await Promise.all(
          items.map((item) => itemRepository.markSold(item._id, session))
        );
      });

      return createdOrder;
    } finally {
      await session.endSession();
    }
  }
};
