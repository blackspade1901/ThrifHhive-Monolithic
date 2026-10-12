export const ITEM_CATEGORIES = Object.freeze([
  "clothing",
  "books",
  "furniture",
  "electronics",
  "decor"
]);

export const ITEM_CONDITIONS = Object.freeze(["Like New", "Good", "Fair"]);

export const ITEM_SORT_OPTIONS = Object.freeze({
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc",
  NEWEST: "newest"
});

export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
});

export const ERROR_CODES = Object.freeze({
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  ITEM_ALREADY_SOLD: "ITEM_ALREADY_SOLD",
  INTERNAL_ERROR: "INTERNAL_ERROR"
});
