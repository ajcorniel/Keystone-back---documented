import express from "express";
import { schemaBody, schemaParams } from "../middlewares/validation";
import { userController } from "../controllers/usersControllers";
import { encryptPassword } from "../controllers/auth/passwordController";
import { createUser, userById } from "../validations/usersScheme";

import { privateUser } from "../responses/objects/userObject";
import {
  serverError,
  notFound,
  forbiddenUser
} from "../responses/messages/usersResponses";

export const userRoutes = express.Router();
const user = userController();

/**
* Makes it possible to create new users, requires the user data and encrypts the password.
* @param {object} user
* @returns status(200), status(500)
*/

userRoutes.post("/", schemaBody(createUser), async (req, res) => {
  let { email, firstname, lastname, password } = req.body;
  let encrypted = await encryptPassword(password);

  return user
    .create({
      email,
      password: encrypted,
      firstname,
      lastname
    })
    .then(object => {
      res.status(200).json(privateUser(object));
    })
    .catch(e => {
      res.status(500).json(serverError(e));
    });
});

/**
 * Makes it possible to read the user's elements in the database, requires id.
 * @param {integer} id
 * @param {object} user
 * @returns status(200), status(500)
 */

userRoutes.get("/:id", schemaParams(userById), (req, res) => {
  const { id } = req.params;

  return user
    .find(id)
    .then(response => {
      if (response.length === 0) return Promise.reject(404);
      else return response;
    })
    .then(object => {
      res.status(200).json(privateUser(object[0]));
    })
    .catch(e => {
      if (e === 404) return res.status(e).json(notFound("User"));
      else return res.status(500).json(serverError(e));
    });
});

/**
 * Makes it possible to update user's info, requires user id.
 * @param {object} user
 * @param {integer} id
 * @returns status(200), status(404), status(500)
 */

userRoutes.put("/:id", schemaParams(userById), (req, res) => {
  const body = req.body;
  const params = req.params;

  return user
    .update(params.id, body)
    .then(response => {
      if (response.length === 0) return Promise.reject(404);
      else return response;
    })
    .then(object => {
      res.status(200).json(privateUser(object));
    })
    .catch(e => {
      if (e === 404) return res.status(e).json(notFound("User"));
      else return res.status(500).json(serverError(e));
    });
});

/**
 * Makes it possible to delete user's in the database, requires id.
 * @param {object} user
 * @param {integer} id
 * @returns status(200), status(403), status(404), status(500)
 */
userRoutes.delete("/:id", schemaParams(userById), (req, res) => {
  const params = req.params;

  return user
    .find(params.id)
    .then(async exist => {
      if (exist.length === 0) return Promise.reject(404);
      if (exist[0].type_id === 3) return Promise.reject(403);
      await user.delete(params.id);
      res.status(200).json({ message: "Successfully deleted" });
    })
    .catch(e => {
      if (e === 404) return res.status(e).json(notFound("User"));
      else if (e === 403) {
        return res.status(e).json(forbiddenUser());
      } else return res.status(500).json(serverError(e));
    });
});
