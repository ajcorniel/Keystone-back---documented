import { QueryFile } from "pg-promise";
import path from "path";

/**
* Helper for linking to external query files
*/

function sql(file) {
  const fullPath = path.join(__dirname, file); // generating full path;
  return new QueryFile(fullPath, { minify: true });
}

/**
* Gives the posibility to create, update and delete users.
* @param {integer} id
* @param {string} email
* @returns Succesfull operation, status(500)
*/

export const users = {
  create: sql("./sql/users/create.sql"),
  select: {
    all: sql("./sql/users/all.sql"),
    byId: sql("./sql/users/selectById.sql"),
    byEmail: sql("./sql/users/selectByEmail.sql")
  },
  update: sql("./sql/users/update.sql"),
  delete: {
    byId: sql("./sql/users/deleteById.sql"),
    byEmail: sql("./sql/users/deleteByEmail.sql")
  }
};

/**
 * Authenticates the login, singup, and updates the last login.
 * @returns Authenticated succefully, status(500)
 */
export const auth = {
  login: sql("./sql/auth/login.sql"),
  updateLogin: sql("./sql/auth/updateLogin.sql"),
  signup: sql("./sql/auth/signup.sql")
};
