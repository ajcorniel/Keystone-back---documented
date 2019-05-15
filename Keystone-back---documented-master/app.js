import "babel-polyfill";
import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import { config } from "./helpers/config";
import { userRoutes } from "./routes/usersRoutes";
import { authRoutes } from "./routes/authRoutes";
import { alterRoutes } from "./routes/alterRoutes";
import { publicRoutes } from "./publicRoutes";
import {
  validateToken,
  whenUnauthorizedError,
  tokenFromHeader
} from "./controllers/auth/tokenController";
import { isAllowed } from "./middlewares/isAllowed";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//use cors
const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
    "Content-Disposition"
  ],
  credentials: true,
  exposedHeaders: ["Content-Type", "Content-Disposition"],
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false
};

app.use(cors(options));
app.options("*", cors(options));
// app.use(
//   validateToken().unless({
//     path: publicRoutes
//   })
// );

// app.use(
//   whenUnauthorizedError((err, req, res) => {
//     res.status(401).json({ message: "Invalid token." });
//   })
// );

// app.use(isAllowed);

// Public Routes
app.use("/login", authRoutes);
app.use("/entities", alterRoutes);

// Private Routes
app.use("/user", userRoutes);

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

export default app.listen(config.port, () =>
  console.log(`App listening on port # ${config.port}`)
);
