import { getAllUsers } from "../models/alterModel";
import { errorObject } from "../responses/objects/errorsModels";

/**
* Counts the ammount of users.
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
