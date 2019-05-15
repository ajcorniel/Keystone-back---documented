import { displayFormatTimestamp } from "../../helpers";
import { updateLastLogin } from "../../models/authModel";
import { errorObject } from "../../responses/objects/errorsModels";
import { selectByEmail } from "../../models/usersModel";
import { compare } from "./passwordController";

/**
* Checks the user's info before login.
* @param {string} email
* @param {string} password
* @param {string} last_login
* @returns status(200), status(403), status(500)
*/

export const authController = () => {
  let log = params => {
    return new Promise(async (res, rej) => {
      try {
        let user = await selectByEmail(params.email);
        let check = await compare(params.password, user[0].password);
        if (check) {
          let updated = await updateLastLogin({
            email: user[0].email,
            last_login: displayFormatTimestamp(new Date())
          });
          
          res(updated);
        } else {
          rej({ status:403, message: "Wrong Password"})
        }
      } catch (e) {
        rej(errorObject(e));
      }
    });
  };

  return { log };
};
