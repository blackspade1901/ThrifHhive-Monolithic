import { AppError } from "../utils/AppError.js";
import { HTTP_STATUS, ERROR_CODES } from "../constants/index.js";

/**
 * Builds an Express middleware that validates a request part (`body`,
 * `query`, or `params`) against a zod schema and replaces it with the
 * parsed/coerced value. Keeps validation declarative and out of controllers.
 */
export const validate = (schema, part = "body") => (req, res, next) => {
  const result = schema.safeParse(req[part]);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".") || part}: ${issue.message}`)
      .join("; ");
    return next(new AppError(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR));
  }

  req[part] = result.data;
  next();
};
