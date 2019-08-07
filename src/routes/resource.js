import express from "express";
import ResourceController from "../controllers/resource";
const router = express.Router();

router
  .get("/", ResourceController.fetchResource)
  .post("/storeMood/:timestamp", ResourceController.addMood);

export default router;
