import mongoose from "mongoose";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

async function start() {
  await mongoose.connect(env.mongoUri);
  logger.info("Connected to MongoDB");

  const app = createApp();
  app.listen(env.port, () => {
    logger.info(`ThriftHive API listening on port ${env.port}`);
  });
}

start().catch((err) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});
