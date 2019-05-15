import { displayFormatTimestamp } from "../../helpers";

/**
* Public user data.
* @param {string} firstname
* @param {string} email
* @param {string} last_login
* @param {string} date_created
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
* @param {integer} id
* @param {string} firstname
* @param {string} lastname
* @param {string} email
* @param {string} last_login
* @param {string} date_created
* @param {integer} status
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