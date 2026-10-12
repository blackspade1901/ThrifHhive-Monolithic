import { itemService } from "../services/itemService.js";
import { catchAsync } from "../utils/catchAsync.js";
import { HTTP_STATUS } from "../constants/index.js";

export const itemController = {
  listItems: catchAsync(async (req, res) => {
    const items = await itemService.listItems(req.query);
    res.status(HTTP_STATUS.OK).json({ success: true, data: items });
  }),

  getItemById: catchAsync(async (req, res) => {
    const item = await itemService.getItemById(req.params.id);
    res.status(HTTP_STATUS.OK).json({ success: true, data: item });
  }),

  listNewItem: catchAsync(async (req, res) => {
    const item = await itemService.listNewItem(req.body);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, data: item, message: "Item listed successfully." });
  })
};
