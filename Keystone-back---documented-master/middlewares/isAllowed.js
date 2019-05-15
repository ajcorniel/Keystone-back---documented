import { publicRoutes as routes } from "../publicRoutes";
import { decode, tokenFromHeader } from "../controllers/auth/tokenController";

/**
* Verifies the permission to make specific actions.
* @returns next, error response
*/

export const isAllowed = (req, res, next) => {
  let token = tokenFromHeader(req);
  let data;

  if (token.message) {
    data = null;
    token = null;
  } else data = decode(token);
  
  let reqUrlAndPublicRoutes = routes.some(
    route =>
      route.methods.some(method => method === req.method) &&
      route.url === req.originalUrl
  );

  if (reqUrlAndPublicRoutes) {
    if (req.method === "GET") return next();
    if (req.method === "POST") return next();
  } else {
    if (data.type === 3) return next();
    else if (data.type === 1)
      return res
        .status(401)
        .json({ message: "You dont have permission to use this function" });
    }
};
