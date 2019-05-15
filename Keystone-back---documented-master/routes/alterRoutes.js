import express from "express";
import { publicUser } from "../responses/objects/userObject";
import { alterController } from "../controllers/alterController";

export const alterRoutes = express.Router();
const alternative = alterController();

/**
* Gets the user routes, if there is not an user with that route, executes an error response.
* @returns user route
*/

alterRoutes.get("/users", async (req, res) => {
  try {
    let object = await alternative.allUsers();
    let responseUsers = [];

    object.forEach(element => {
      responseUsers.push(publicUser(element));
    });

    res.status(200).json(responseUsers);
  } catch (e) {
    res.json(e);
  }
});
