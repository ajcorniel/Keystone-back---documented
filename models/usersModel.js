import db from "../database/db";
import { users } from "../database/queryFile";
import { errorObject } from "../responses/objects/errorsModels";

/**
 * insert: creates a new user.
 * @param {Object} Object email, password, first_name, last_name, last_login, date_created
 */
export const insert = user => {
  const promise = (resolve, reject) => {
    const queryCallback = async object => {
      try {
        const result = await object.one(users.create, [
          user.firstname,
          user.lastname,
          user.email,
          user.password,
          user.last_login,
          user.date_created,
          user.type_id
        ]);
        resolve(result);
        // console.log  ("insert query result => ", result);
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

/**
 * select: show an existing user.
 * @param {String} user_id the id of the user to select.
 */
export const select = id => {
  const promise = (resolve, reject) => {
    const queryCallback = async object => {
      try {
        const result = await object.any(users.select.byId, [id]);
        resolve(result);
        // console.log  ("select id query result => ", result);
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

/**
 * selectByEmail: show an existing user.
 * @param {String} user_id the id of the user to select.
 */
export const selectByEmail = email => {
  const promise = (resolve, reject) => {
    const queryCallback = async object => {
      try {
        const result = await object.any(users.select.byEmail, [email]);
        resolve(result);
        // console.log ("select email query result => ", result);
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

/**
 * update: updates an existing user.
 * @param {Integer} id of the user to update.
 * @param {Array} keys can be any of those -> email, password, firstname, lastname
 * @param {Array} values of the keys.
 */

export const update = (id, body) => {
  const promise = (resolve, reject) => {
    const queryCallback = async object => {
      try {
        // console.log (id);
        // console.log (body.keys);
        // console.log (body.values);
        // const result = await object.one(users.update, [
        //   user.fname,
        // ]);
        // resolve(result);
        // console.log  ("query result => ", result);
        // object.done();
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

/**
 * delete: deletes an existing user.
 * @param {Integer} id of the user to delete.
 */

export const deleteById = id => {
  const promise = (resolve, reject) => {
    const queryCallback = async object => {
      try {
        const result = await object.any(users.delete.byId, [id]);
        // console.log ("delete by id query result => ", result);
        resolve(result);
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

/**
 * delete: deletes an existing user.
 * @param {String} email of the user to delete.
 */

export const deleteByEmail = email => {
  const promise = (resolve, reject) => {
    const queryCallback = async object => {
      try {
        const result = await object.any(users.delete.byEmail, [email]);
        resolve(result);
        // console.log ("delete by email query result => ", result);
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
