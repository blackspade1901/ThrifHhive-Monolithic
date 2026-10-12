import mongoose from "mongoose";
import { env } from "../src/config/env.js";
import { Item } from "../src/models/Item.js";
import { logger } from "../src/utils/logger.js";

const items = [
  {
    title: "Vintage Denim Jacket",
    description: "Classic 90s-cut denim jacket, lightly faded, one small pocket patch.",
    price: 28,
    category: "clothing",
    condition: "Good",
    imageUrl: "https://imgs.search.brave.com/5Qp-1vG6B0D7GUrhfr6OffosQzhg-YF4IGxBk4BTuAo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aGVo/YXJsZXF1aW4uaWUv/Y2RuL3Nob3AvZmls/ZXMvSU1HXzMyNzNf/Ml8xMDI0eC5qcGc_/dj0xNzQ4MDE4MTQ1",
    listedBy: "Priya"
  },
  {
    title: "Wool Blend Overcoat",
    description: "Charcoal grey overcoat, tailored fit, dry-cleaned before listing.",
    price: 45,
    category: "clothing",
    condition: "Like New",
    imageUrl: "https://n.nordstrommedia.com/it/4ab0d884-ec3e-46ac-9242-e9f59fdca0a7.jpeg?h=368&w=240&dpr=2",
    listedBy: "Marcus"
  },
  {
    title: "Floral Summer Dress",
    description: "Lightweight cotton dress, midi length, worn twice.",
    price: 18,
    category: "clothing",
    condition: "Like New",
    imageUrl: "https://m.media-amazon.com/images/I/71UpnzIi18L.jpg",
    listedBy: "Aiko"
  },
  {
    title: "The Great Gatsby (Hardcover)",
    description: "Hardcover edition with dust jacket, minor shelf wear on spine.",
    price: 9,
    category: "books",
    condition: "Good",
    imageUrl: "https://odinparker.com/cdn/shop/files/a5758fa2c10fb88368ad1c945b3e4f55576c6cb5c85dcf0e80c1b8840548b468_670x1024.jpg?v=1746234862",
    listedBy: "Leah"
  },
  {
    title: "Sapiens by Yuval Noah Harari",
    description: "Paperback, some highlighting in first two chapters only.",
    price: 7,
    category: "books",
    condition: "Fair",
    imageUrl: "https://shop.sapienkid.com/cdn/shop/files/Untitleddesign_16_1_19ea6dca-33ab-4722-a553-2552d3c4f366_1024x1024.webp?v=1768566038",
    listedBy: "Devon"
  },
  {
    title: "Complete Sherlock Holmes Box Set",
    description: "4-volume set, all covers intact, great condition throughout.",
    price: 22,
    category: "books",
    condition: "Like New",
    imageUrl: "https://www.books2door.com/cdn/shop/files/thumbnail_e8f50786-8930-4312-ba41-a61d90321f31_512x512.jpg?v=1691667821",
    listedBy: "Priya"
  },
  {
    title: "Mid-Century Oak Side Table",
    description: "Solid oak, tapered legs, small water ring on top surface.",
    price: 60,
    category: "furniture",
    condition: "Good",
    imageUrl: "https://i.ebayimg.com/images/g/XrgAAeSwS5ZpwVrH/s-l400.webp",
    listedBy: "Marcus"
  },
  {
    title: "Rattan Accent Chair",
    description: "Handwoven rattan chair with cushion, sturdy frame, no repairs needed.",
    price: 85,
    category: "furniture",
    condition: "Good",
    imageUrl: "https://m.media-amazon.com/images/I/81CVu0VnWML.jpg",
    listedBy: "Sofia"
  },
  {
    title: "Bookshelf, 5-Tier Walnut Finish",
    description: "Adjustable shelves, minor scuff on bottom panel, disassembles easily.",
    price: 40,
    category: "furniture",
    condition: "Fair",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71jheJAYNVL.jpg",
    listedBy: "Devon"
  },
  {
    title: "Instant Camera (Polaroid-style)",
    description: "Works perfectly, includes original strap, no film included.",
    price: 35,
    category: "electronics",
    condition: "Good",
    imageUrl: "https://filmcamerastore.co.uk/cdn/shop/files/polaroid-supercolour-600-instant-film-camera-5.jpg?v=1689264766&width=460",
    listedBy: "Aiko"
  },
  {
    title: "Bluetooth Turntable",
    description: "Belt-drive turntable with Bluetooth output, tested and working.",
    price: 70,
    category: "electronics",
    condition: "Good",
    imageUrl: "https://id.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwdc8a66ec/JBLSpinnerBTGoldFrontLidOpen_web_hero.png?sw=537&sfrm=png",
    listedBy: "Leah"
  },
  {
    title: "Noise-Cancelling Headphones",
    description: "Over-ear headphones, battery holds a full charge, case included.",
    price: 48,
    category: "electronics",
    condition: "Like New",
    imageUrl: "https://i.pcmag.com/imagery/reviews/00GQdWCwRaI7xLpUaJ2C8rr-1.fit_lim.size_420x236.v1747235131.jpg",
    listedBy: "Sofia"
  },
  {
    title: "Handwoven Wall Tapestry",
    description: "Earth-tone macrame tapestry, approx 3ft x 4ft, no fading.",
    price: 15,
    category: "decor",
    condition: "Like New",
    imageUrl: "https://www.54kibo.com/cdn/shop/files/Mega-Menu-TilesWall-Art-04.webp?v=1739179104&width=241",
    listedBy: "Priya"
  },
  {
    title: "Brass Table Lamp",
    description: "Antique brass finish, new bulb included, shade has slight discoloration.",
    price: 26,
    category: "decor",
    condition: "Fair",
    imageUrl: "https://m.media-amazon.com/images/I/81+I3gD02bL.jpg",
    listedBy: "Marcus"
  },
  {
    title: "Ceramic Vase Set (3-piece)",
    description: "Hand-glazed ceramic vases in graduated sizes, no chips or cracks.",
    price: 20,
    category: "decor",
    condition: "Good",
    imageUrl: "https://m.media-amazon.com/images/I/61ikaOGqeVL.jpg",
    listedBy: "Aiko"
  },
  {
    title: "Corduroy Trousers, Tan",
    description: "Wide-wale corduroy, straight leg, tag still attached.",
    price: 16,
    category: "clothing",
    condition: "Like New",
    imageUrl: "https://i.pinimg.com/originals/19/3a/f1/193af1db837da654e421ce01666410b0.jpg",
    listedBy: "Devon"
  },
  {
    title: "Cast Iron Skillet, 10-inch",
    description: "Well-seasoned, ready to cook with, no rust spots.",
    price: 24,
    category: "decor",
    condition: "Good",
    imageUrl: "https://fieldcompany.com/cdn/shop/files/Frame73_04fa9bc2-e42b-407b-9dc1-81000fa78818.jpg?v=1728323047&width=800",
    listedBy: "Sofia"
  },
  {
    title: "Leather Messenger Bag",
    description: "Full-grain leather, brass buckles, patina from light use.",
    price: 38,
    category: "clothing",
    condition: "Good",
    imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/w_1008,h_1319,q_auto,f_auto,e_sharpen/SD_03_T09_5373M_N0_X_EC_1",
    listedBy: "Leah"
  }
];

async function seed() {
  console.log(process.env.MONGODB_URI);
  await mongoose.connect(env.mongoUri);
  logger.info("Connected to MongoDB for seeding");

  await Item.deleteMany({});
  logger.info("Cleared existing items");

  await Item.insertMany(items);
  logger.info(`Inserted ${items.length} items`);

  await mongoose.disconnect();
  logger.info("Seeding complete");
}

seed().catch((err) => {
  logger.error({ err }, "Seeding failed");
  process.exit(1);
});
