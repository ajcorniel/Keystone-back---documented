import bcrypt from "bcrypt";;

/**
 * Encrypt the user password
 * @param password
 * @return Promise
 */
export const encryptPassword = password => {
  return bcrypt.hash(password, 10);
};

/**
 * Validate the credentials.
 *
 * @param passwordA
 * @param passwordB
 * @return {*|PromiseLike<boolean>|Promise<boolean>}
 */
export const compare = (passwordA, passwordB) => {
  return bcrypt.compare(passwordA, passwordB);
};
