/**
 * AppError represents a known, "operational" error — something we expect can
 * happen (bad input, missing resource, business-rule violation) and want to
 * turn into a clean HTTP response. Anything that is NOT an AppError is
 * treated as a programmer error/bug by the error-handling middleware and is
 * logged with a stack trace instead of being shown to the client.
 */
export class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
