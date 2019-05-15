import { errorResponse } from "../objects/errorsModels";

/**
* Returns an error response if there is an error in the server.
*/

export const serverError = e => {
  return errorResponse(e);
};

/**
* If an entity that doesn't exist is searched, returns a "not found" message.
*/

export const notFound = entity => {
  return { message: `${entity} not found.` };
};

/**
* If a regular user tries to delete another user, returns an error message.
*/

export const forbiddenUser = () => {
  return {
    message: "You dont have permission to delete this user"
  }
};
