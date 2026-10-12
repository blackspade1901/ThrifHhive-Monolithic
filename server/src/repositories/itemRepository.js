import { Item } from "../models/Item.js";

/**
 * Item repository — the only module allowed to import the Item model.
 * Services depend on this module, never on `Item` directly, so the
 * persistence layer could be swapped without touching business logic.
 */
export const itemRepository = {
  async findMany({ category, search, sort } = {}) {
    const query = {};
    if (category) query.category = category;
    if (search) query.$text = { $search: search };

    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      newest: { createdAt: -1 }
    };

    return Item.find(query)
      .sort(sortMap[sort] ?? sortMap.newest)
      .lean();
  },

  async findById(id) {
    return Item.findById(id).lean();
  },

  async findByIds(ids) {
    return Item.find({ _id: { $in: ids } });
  },

  async create(itemData) {
    const created = await Item.create(itemData);
    return created.toObject();
  },

  async markSold(id, session) {
    return Item.findByIdAndUpdate(id, { isSold: true }, { new: true, session });
  }
};
