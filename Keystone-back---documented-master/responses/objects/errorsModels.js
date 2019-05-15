/**
* Makes it possible to retrieve specific error messages.
* @param {string} message
* @param {string} detail
* @param {integer} code
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
* Returns the error response.
* @returns "Internal Server Error"
*/

export const errorResponse = e => ({
  message: e.message,
  detail: e.detail,
  text: "Internal Server Error"
});