import Model from "../helpers/model";
import { displayFormatTimestamp } from "../helpers";
import { insert, select, update, deleteById } from "../models/usersModel";

/*
* Manages the user's data in the database.
* @params email, password, firstnmane, lastname, last_login, date_created, type_id.
*/

export const userController = () => {
  let post = params => {
    return insert({
      email: params.email,
      password: params.password,
      firstname: params.firstname,
      lastname: params.lastname,
      last_login: displayFormatTimestamp(new Date()),
      date_created: displayFormatTimestamp(new Date()),
      type_id: 1
    });
  };

  let put = (id, data) => {
    let updatable = [
      "email",
      "password",
      "last_login",
      "firstname",
      "lastname"
    ];
    let fields = Object.keys(data).filter(key => updatable.includes(key));

    let body = {
      keys: fields,
      values: fields.map(f => data[f])
    };

    return update(id, body);
  };

  let get = id => {
    return select(id);
  };

  let destroy = id => {
    return deleteById(id);
  };

  return new Model("users", { post, put, get, destroy });
};
