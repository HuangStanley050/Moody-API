import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import * as admin from "firebase-admin";
import { checkHeader } from "./middlewares/checkAuthHeader";
import serviceAccount from "./pwagram-bd625-firebase-adminsdk-ew3ye-863e79e816.json";

import authRouter from "./routes/auth";
import resourceRouter from "./routes/resource";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const auth = admin.auth();
const db = admin.firestore();
const app = express();
app.set("auth", auth);
app.set("db", db);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/resource", checkHeader, resourceRouter);
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  //const data = error.data;
  res.status(status).json({ message });
});

export default app;
