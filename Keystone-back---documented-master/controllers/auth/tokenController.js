import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

const secret = process.env.SECRET;

/**
* Validates a jwt token.
* @param {object} token
* @returns Express jwt token
*/

export const validateToken = () => {
  return expressJwt({
    secret
    ,getToken:tokenFromHeader
  });
};

/**
* Gets a token from the headers.
* @returns token, "no  was found"
*/

export const tokenFromHeader = req => {
  const headers = req.headers;
  if (headers.authorization) {
    const [type, token] = headers.authorization.split(" ");
    if (type === "Bearer") return token;
  }
  return { message: "No  was found" };
};

/**
 * Makes an error response.
 * @param {string} callback
 * @returns next
 */

export const whenUnauthorizedError = callback => {
  return function guardAgainstUnauthorizedError(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      callback(err, req, res, next);
    }
    next();
  };
};

/**
* Issue a jwt token with the user's info.
* @param {integer} id
* @param {string} email
* @param {integer} type
* @return string.
*/

export const issueUserJwt = user => {
  return issueJwt({
    id: user.user_id,
    email: user.email,
    type: user.type_id
  });
};

/**
 * Issue a jwt token with the actual data.
 * @param {string} data
 * @return string
 */

export const issueJwt = data => {
  return jwt.sign(data, secret, { expiresIn: "24h" });
};

/**
* Decodes a jwt token.
* @returns decoded token
*/

export const decode = token => {
  return jwt.decode(token);
};
