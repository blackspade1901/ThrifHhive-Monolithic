/**
 * Wraps an async Express handler so any rejected promise is forwarded to
 * next(err) automatically. Without this, every controller would need its own
 * try/catch boilerplate just to avoid unhandled rejections.
 */
export const catchAsync = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};
