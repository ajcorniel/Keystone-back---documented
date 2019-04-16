import db from "../database/db";
import { auth } from "../database/queryFile";
import { errorObject } from "../responses/objects/errorsModels";

/**
 * updateLastLogin: updated last_login of an existing user.
 * @param {Object} Object email, last_login.
 */
export const updateLastLogin = user => {
  const promise = (resolve, reject) => {
    const queryCallback = async object => {
      try {
        const result = await object.one(auth.updateLogin, [
          user.last_login,
          user.email
        ]);
        resolve(result);
        // console.log  ("updated login query result => ", result);
        object.done();
      } catch (e) {
        reject(errorObject(e));
        object.done();
      }
    };

    db.connect()
      .then(queryCallback)
      .catch(e => reject(errorObject(e)));
  };
  return new Promise(promise);
};
