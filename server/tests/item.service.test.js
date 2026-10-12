import { itemService } from "../src/services/itemService.js";
import { Item } from "../src/models/Item.js";
import { AppError } from "../src/utils/AppError.js";

const baseItem = {
  title: "Test Item",
  description: "A test item",
  price: 10,
  category: "books",
  condition: "Good",
  imageUrl: "https://picsum.photos/seed/test/200",
  listedBy: "Tester"
};

describe("itemService", () => {
  test("listItems returns all items when no filters given", async () => {
    await Item.create(baseItem);
    await Item.create({ ...baseItem, title: "Second Item", category: "furniture" });

    const results = await itemService.listItems({});
    expect(results).toHaveLength(2);
  });

  test("listItems filters by category", async () => {
    await Item.create(baseItem);
    await Item.create({ ...baseItem, title: "Chair", category: "furniture" });

    const results = await itemService.listItems({ category: "furniture" });
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe("Chair");
  });

  test("listItems sorts by price ascending", async () => {
    await Item.create({ ...baseItem, title: "Cheap", price: 5 });
    await Item.create({ ...baseItem, title: "Expensive", price: 50 });

    const results = await itemService.listItems({ sort: "price_asc" });
    expect(results.map((i) => i.title)).toEqual(["Cheap", "Expensive"]);
  });

  test("getItemById throws AppError (404) when item does not exist", async () => {
    const fakeId = "64b6f0c2f1a2b3c4d5e6f7a8";
    await expect(itemService.getItemById(fakeId)).rejects.toThrow(AppError);
  });

  test("getItemById returns the item when it exists", async () => {
    const created = await Item.create(baseItem);
    const found = await itemService.getItemById(created._id.toString());
    expect(found.title).toBe(baseItem.title);
  });

  test("listNewItem creates an item that is not sold by default", async () => {
    const created = await itemService.listNewItem(baseItem);
    expect(created.isSold).toBe(false);
    expect(created.title).toBe(baseItem.title);
  });
});
