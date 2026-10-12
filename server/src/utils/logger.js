import pino from "pino";
import { env } from "../config/env.js";

/**
 * Single logger instance used throughout the app. No module should call
 * console.log/console.error directly — import this instead, so log level,
 * format, and (later) destinations are controlled in one place.
 */
export const logger = pino({
  level: env.logLevel,
  transport: env.nodeEnv === "development" ? { target: "pino-pretty" } : undefined
});
