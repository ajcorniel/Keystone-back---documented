/**
* CRUD model
*/

export default class Model {
  constructor(table, crud) {
    this.table = table;
    this.crud = crud;
  }

  first() {}

/**
* Posts the values in the crud system.
*/

  create(values) {
    return this.crud.post(values);
  }

/**
* Finds by id.
*/

  find(id) {
    return this.crud.get(id);
  }

/**
* Finds by email
*/

  findByEmail(email) {
    return this.crud.getByEmail(email);
  }

/**
* Updates id value.
*/

  update(id, values) {
    return this.crud.put(id, values);
  }

/**
* Deletes by id.
*/

  delete(id) {
    return this.crud.destroy(id);
  }

/**
* Deletes by email.
*/

  deleteByEmail(email) {
    return this.crud.destroyByEmail(email);
  }
}
