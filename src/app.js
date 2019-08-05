import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import * as admin from "firebase-admin";
import serviceAccount from "./pwagram-bd625-firebase-adminsdk-ew3ye-863e79e816.json";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
