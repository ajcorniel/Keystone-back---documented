/**
* Posible errors.
*/

export const errorObject = e => ({
  message: e.message,
  detail: e.detail,
  table: e.table,
  column: e.column,
  schema: e.schema,
  code: e.code,
  error: e.error,
  constraint: e.constraint
});

/**
* Returns an error response.
*/

export const errorResponse = e => ({
  message: e.message,
  detail: e.detail,
  text: "Internal Server Error"
});