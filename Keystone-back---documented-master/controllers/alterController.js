import { getAllUsers } from "../models/alterModel";
import { errorObject } from "../responses/objects/errorsModels";

/**
* Returns the total ammount of users.
* @param {integer} length
* @returns allUsers, status(404)
*/

export const alterController = () => {
  
  let allUsers = () => {
    return new Promise(async (res, rej) => {
      try {
        let users = await getAllUsers();
        if (users[0].length === 0)
          res({ message: "No users found", status: 404 });
        res(users);
      } catch (e) {
        rej(errorObject(e));
      }
    });
  };

  return { allUsers };
};
