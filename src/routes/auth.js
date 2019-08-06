import express from "express";
import axios from "axios";

const router = express.Router();
const api_key = process.env.API_KEY;
const end_point = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`;

router
  .get("/", (req, res, next) => {
    res.json({ message: "Auth route" });
  })
  .post("/login", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const data = {
      email,
      password,
      returnSecureToken: true
    };
    let result;
    try {
      result = await axios.post(end_point, data);
    } catch (e) {
      const error = new Error("Login failed");
      //console.log(e);
      return next(error);
    }

    //console.log(result.data.idToken);
    res.json({ message: "Login Successful", token: result.data.idToken });
  });

export default router;
