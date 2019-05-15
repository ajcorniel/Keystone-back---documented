import moment from "moment";

/**
* Generates a random code
* @returns xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
*/

export function randomCode() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
* Gets the actual date.
* @returns date
*/

export function displayFormatDate(date) {
  return moment(date).format(dateFormat());
}

/**
* Date format.
* @returns YYYY-MM-DD
*/

export function dateFormat() {
  return "YYYY-MM-DD";
}

/**
* Gets the actual time.
* @param {string} timestamp
* @returns hours and minutes
*/

export function displayFormatTimestamp(timestamp) {
  return moment(timestamp).format(timestampFormat());
}

/**
* Time format (HH:mm:ss).
*/

export function timestampFormat() {
  return dateFormat() + " HH:mm:ss";
}

/**
* Converts a Json object into a string.
* @param {string} strJson stringified json object
* @returns string
*/

export function stringifyObjects(json) {
  return Object.keys(json).reduce(function(strJson, key) {
    return Object.assign(strJson, { [key]: stringifyIfObject(json[key]) });
  }, {});

/**
* Makes it sure that is a Json object that gets converted into a string.
* @param {json} value format type.
* @returns string
*/

  function stringifyIfObject(value) {
    return typeof value === "object" ? JSON.stringify(value) : value;
  }
}

/**
* Returns an already defined variable and makes it undefined.
* @param {object} variable a defined variable.
* @returns undefined
*/

export function isDefined(variable) {
  return variable !== undefined;
}

/**
* Returns the last login.
* @returns date
*/

export function lastLogin() {
  return moment().format("LLL");
}

/**
* Last login format.
* @param {string} date
* @returns Actual moment
*/

export function formatLastLogin(date) {
  return moment(date).format("LLL");
}
