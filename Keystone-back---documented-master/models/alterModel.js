import db from "../database/db";
import { users } from "../database/queryFile";
import { errorObject } from "../responses/objects/errorsModels";

/**
 * Retreive an Array with all the users in the database.
 * @returns resolve, reject
 */
export const getAllUsers = () => {
  const promise = (resolve, reject) => {
    const queryCallback = async object => {
      try {
        const result = await object.any(users.select.all);
        resolve(result);
        // console.log  ("get all query result => ", result);
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