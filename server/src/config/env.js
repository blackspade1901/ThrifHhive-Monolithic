import dotenv from "dotenv";

dotenv.config();

/**
 * Single source of truth for environment configuration.
 * Every other module reads config from here — never `process.env` directly —
 * so there is exactly one place that knows how to parse/validate env vars,
 * and startup fails fast (with a clear message) if something required is missing.
 */
const REQUIRED_VARS = ["MONGODB_URI"];

function assertRequiredVarsPresent() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    // Fail fast — better to crash at startup than at first request.
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}. ` +
        "Copy .env.example to .env and fill them in."
    );
  }
}

assertRequiredVarsPresent();

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  mongoUri: process.env.MONGODB_URI,
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  logLevel: process.env.LOG_LEVEL ?? "info",
  isTest: (process.env.NODE_ENV ?? "development") === "test"
});
