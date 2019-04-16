import { displayFormatTimestamp } from "../../helpers";

/**
* Public user login data.
* @params firstname, lastname, email, last login, created date.
*/

export const publicUser = u => ({
  firstname: u.firstname,
  lastname: u.lastname,
  email: u.email,
  last_login: displayFormatTimestamp(u.last_login),
  date_created: displayFormatTimestamp(u.date_created)
});

/**
* Private user login data.
* @params id, firstname, lastname, email, last login, created date, status.
*/

export const privateUser = u => ({
  id: u.user_id,
  firstname: u.firstname,
  lastname: u.lastname,
  email: u.email,
  last_login: displayFormatTimestamp(u.last_login),
  date_created: displayFormatTimestamp(u.date_created),
  status: u.type_id
});