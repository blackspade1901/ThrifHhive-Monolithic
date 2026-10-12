import { AppError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import { HTTP_STATUS, ERROR_CODES } from "../constants/index.js";

/**
 * Single place where every error in the request lifecycle is turned into an
 * HTTP response. Operational errors (AppError) are shown to the client as-is.
 * Anything else is treated as a bug: logged with a stack trace and hidden
 * behind a generic message so internals are never leaked to clients.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message }
    });
  }

  logger.error({ err }, "Unexpected error");
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: { code: ERROR_CODES.INTERNAL_ERROR, message: "Something went wrong." }
  });
}

export function notFoundHandler(req, res) {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    error: { code: ERROR_CODES.NOT_FOUND, message: `Route ${req.originalUrl} not found.` }
  });
}
