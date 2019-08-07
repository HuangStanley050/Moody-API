import axios from "axios";
const api_key = process.env.API_KEY;
const end_point = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`;
export default {
  greet: (req, res, next) => res.json({ message: "Auth route" }),
  login: async (req, res, next) => {
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
      error.statusCode = 401;
      //console.log(e);
      return next(error);
    }

    res.json({ message: "Login Successful", token: result.data.idToken });
  }
};
