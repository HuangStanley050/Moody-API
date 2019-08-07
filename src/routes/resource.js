import express from "express";
import ResourceController from "../controllers/resource";
const router = express.Router();

router
  .get("/", ResourceController.fetchResource)
  .post("/storeMood", async (req, res, next) => {
    const db = req.app.get("db");
    const admin = req.app.get("auth");
    const token = req.token;
    let check_result;

    check_result = await checkToken(admin, token);

    if (!check_result) {
      const error = new Error("Token Error");
      return next(error);
    }

    const data = {
      userId: "12345",
      date: "test",
      gifyUrl: "www.text.com",
      mood: "sad"
    };
    let save_result = await db.collection("moods").add(data);
    //console.log(save_result);
    res.json({ message: "route to store mood to database" });
  });

export default router;
