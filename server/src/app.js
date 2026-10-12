import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import apiRoutes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { logger } from "./utils/logger.js";
import { env } from "./config/env.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.clientOrigin }));
  app.use(express.json());
  app.use(pinoHttp({ logger, autoLogging: !env.isTest }));

  app.get("/health", (req, res) => res.status(200).json({ success: true, data: { status: "ok" } }));

  app.use("/api/v1", apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
