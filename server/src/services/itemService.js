import { itemRepository } from "../repositories/itemRepository.js";
import { AppError } from "../utils/AppError.js";
import { HTTP_STATUS, ERROR_CODES } from "../constants/index.js";

/**
 * Framework-agnostic business logic for items. Never imports Express and
 * never talks to Mongoose directly — only through itemRepository — so this
 * module is easy to unit test and easy to reuse (e.g. from a CLI script).
 */
export const itemService = {
  async listItems(filters) {
    return itemRepository.findMany(filters);
  },

  async getItemById(id) {
    const item = await itemRepository.findById(id);
    if (!item) {
      throw new AppError("Item not found.", HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND);
    }
    return item;
  },

  async listNewItem(itemData) {
    return itemRepository.create({ ...itemData, isSold: false });
  }
};
