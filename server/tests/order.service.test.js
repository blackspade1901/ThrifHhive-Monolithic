import { orderService } from "../src/services/orderService.js";
import { itemService } from "../src/services/itemService.js";
import { Item } from "../src/models/Item.js";
import { AppError } from "../src/utils/AppError.js";

const baseItem = {
  title: "Test Item",
  description: "A test item",
  price: 20,
  category: "books",
  condition: "Good",
  imageUrl: "https://picsum.photos/seed/test/200",
  listedBy: "Tester"
};

const buyerDetails = {
  buyerName: "Jordan Buyer",
  buyerEmail: "jordan@example.com",
  shippingAddress: "123 Main St",
  paymentMethod: "card"
};

describe("orderService.checkout", () => {
  test("creates an order and marks purchased items as sold", async () => {
    const itemOne = await itemService.listNewItem(baseItem);
    const itemTwo = await itemService.listNewItem({ ...baseItem, title: "Second", price: 15 });

    const order = await orderService.checkout({
      ...buyerDetails,
      itemIds: [itemOne._id.toString(), itemTwo._id.toString()]
    });

    expect(order.totalAmount).toBe(35);
    expect(order.items).toHaveLength(2);

    const refreshedOne = await Item.findById(itemOne._id);
    const refreshedTwo = await Item.findById(itemTwo._id);
    expect(refreshedOne.isSold).toBe(true);
    expect(refreshedTwo.isSold).toBe(true);
  });

  test("rejects checkout if an item is already sold", async () => {
    const soldItem = await itemService.listNewItem({ ...baseItem, isSold: true });
    await Item.findByIdAndUpdate(soldItem._id, { isSold: true });

    await expect(
      orderService.checkout({ ...buyerDetails, itemIds: [soldItem._id.toString()] })
    ).rejects.toThrow(AppError);

    // Confirm no order side-effects leaked through despite the rejection.
    const stillThere = await Item.findById(soldItem._id);
    expect(stillThere.isSold).toBe(true);
  });

  test("rejects checkout referencing a non-existent item id", async () => {
    const fakeId = "64b6f0c2f1a2b3c4d5e6f7a8";
    await expect(
      orderService.checkout({ ...buyerDetails, itemIds: [fakeId] })
    ).rejects.toThrow(AppError);
  });
});
