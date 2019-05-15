/**
* Makes it possible to use the CRUD system into the database's tables.
* @constructor table, crud
* @returns crud
*/

export default class Model {
  constructor(table, crud) {
    this.table = table;
    this.crud = crud;
  }

  first() {}

/**
* Posts the values in the crud system.
* @param {object} values new values
* @returns new values in the crud system.
*/

  create(values) {
    return this.crud.post(values);
  }

/**
* Finds an user by id.
* @param {integer} id
* @returns user
*/

  find(id) {
    return this.crud.get(id);
  }

/**
* Finds an user by email.
* @param {string} email
* @returns user
*/

  findByEmail(email) {
    return this.crud.getByEmail(email);
  }

/**
* Updates user's id and values.
* @param {integer} id
* @param {object} values
* @returns updated id and values.
*/

  update(id, values) {
    return this.crud.put(id, values);
  }

/**
* Deletes an user by id.
* @param {integer} id
* @returns delete
*/

  delete(id) {
    return this.crud.destroy(id);
  }

/**
* Deletes an user by email.
* @param {string} email
* @returns delete
*/

  deleteByEmail(email) {
    return this.crud.destroyByEmail(email);
  }
}
