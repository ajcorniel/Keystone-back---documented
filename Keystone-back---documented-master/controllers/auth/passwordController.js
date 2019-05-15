import bcrypt from "bcrypt";;

/**
 * Encrypts the user's password
 * @param password
 * @return Promise
 */
export const encryptPassword = password => {
  return bcrypt.hash(password, 10);
};

/**
 * Validates the credentials.
 * @param passwordA
 * @param passwordB
 * @return {*|PromiseLike<boolean>|Promise<boolean>}
 */
export const compare = (passwordA, passwordB) => {
  return bcrypt.compare(passwordA, passwordB);
};
