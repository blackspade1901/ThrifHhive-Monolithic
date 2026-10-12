import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";

// A replica set (not a plain standalone) is required so that
// session.withTransaction(...) in orderService works in tests exactly the
// way it will against MongoDB Atlas.
let replSet;

beforeAll(async () => {
  replSet = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
  const uri = replSet.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await replSet.stop();
});
