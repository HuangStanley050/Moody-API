import express from "express";

import AuthController from "../controllers/auth";
const router = express.Router();

router.get("/", AuthController.greet).post("/login", AuthController.login);

export default router;
