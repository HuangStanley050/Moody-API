import express from "express";
const router = express.Router();
const old_token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcyODRlYTZiNGZlZDBmZDc1MzE4NTg2NDZmZDYzNjE1ZGQ3YTIyZjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHdhZ3JhbS1iZDYyNSIsImF1ZCI6InB3YWdyYW0tYmQ2MjUiLCJhdXRoX3RpbWUiOjE1NjQ5ODA2ODksInVzZXJfaWQiOiJwN1E2bDY5bjEzUnFkaXRpbHRhOE9JTkRGTEEzIiwic3ViIjoicDdRNmw2OW4xM1JxZGl0aWx0YThPSU5ERkxBMyIsImlhdCI6MTU2NDk4MDY4OSwiZXhwIjoxNTY0OTg0Mjg5LCJlbWFpbCI6ImluZmFtb3VzX2dvZGhhbmRAeWFob28uY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImluZmFtb3VzX2dvZGhhbmRAeWFob28uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.RpFWKZMDqVH6G0Y2kiF8iWo3ouo9PGk7u9qo29yGNA0gyZUCBNwu4BhRyyBGw5kcaPZXg0ywjAGZ2QzC3U0oND16bNTyHwAhM-rpGZOKQ3_29ZE9E1UXHSnCZ0hyVGQdEwXTbXM9cmnnvDqgl7HGIFdbrlgZQmmDVj_vYbXUGnlxW-oh9FMZGw7JYuE9WTaGztg3MSkGOcWV1BquuHJgGe-eMuA6sk1yrUKHxyxfXmDmu_ocshWXicq_TJ0jWZ1Vz9KOYT_FPK7UHZSxcl2HBbybO1v898qRp_FEREpw4gKN66w0nVjxKL5ixxuvtf3J1_lo3FThvnriW_1S_QTOrQ";
router
  .get("/", async (req, res, next) => {
    const admin = req.app.get("auth");
    const token = req.token;

    let result;

    try {
      result = await admin.verifyIdToken(token);
    } catch (err) {
      console.log(err);
      const error = new Error("Token error");
      next(error);
      return;
    }

    //console.log(result);
    res.json({ message: "Token verified" });
  })
  .post("/storeMood", async (req, res, next) => {
    const db = req.app.get("db");
    const admin = req.app.get("auth");
    const token = req.token;
    let result;

    try {
      result = await admin.verifyIdToken(token);
    } catch (err) {
      console.log(err);
      const error = new Error("Token error");
      next(error);
      return;
    }

    const data = {
      userId: "1234",
      date: "test",
      gifyUrl: "www.text.com",
      mood: "happy"
    };
    let save_result = await db.collection("moods").add(data);
    console.log(save_result);
    res.json({ message: "route to store mood to database" });
  });

export default router;
