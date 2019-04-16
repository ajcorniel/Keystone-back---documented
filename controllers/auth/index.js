import { displayFormatTimestamp } from "../../helpers";
import { updateLastLogin } from "../../models/authModel";
import { errorObject } from "../../responses/objects/errorsModels";
import { selectByEmail } from "../../models/usersModel";
import { compare } from "./passwordController";

/**
* Manages the user's login system.
* 
* @params email, password
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
