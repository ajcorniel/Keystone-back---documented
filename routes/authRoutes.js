import express from "express";
import { authController } from "../controllers/auth";
import { loginScheme } from "../validations/authScheme";
import { schemaBody } from "../middlewares/validation";
import { issueUserJwt } from "../controllers/auth/tokenController";
import { displayFormatTimestamp } from "../helpers";

export const authRoutes = express.Router();
const auth = authController();

/**
* Gets authentication routes.
*/

authRoutes.post("/", schemaBody(loginScheme), async (req, res) => {
  const { email, password } = req.body;

  return auth
    .log({
      email,
      password
    })
    .then(object => {
      res.status(200).json({
        token: issueUserJwt(object),
        last_login: displayFormatTimestamp(new Date())
      });
    })
    .catch(e => {
      if (e.status === 403) return res.status(403).send({ message: e.message });
      res.status(404).json({ message: `Couldnt find email` });
    });
});
