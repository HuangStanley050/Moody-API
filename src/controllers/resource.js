import { checkToken } from "../middlewares/checkToken";
import GphApiClient from "giphy-js-sdk-core";
import formatTime from "../middlewares/formatTime";
const old_token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcyODRlYTZiNGZlZDBmZDc1MzE4NTg2NDZmZDYzNjE1ZGQ3YTIyZjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHdhZ3JhbS1iZDYyNSIsImF1ZCI6InB3YWdyYW0tYmQ2MjUiLCJhdXRoX3RpbWUiOjE1NjQ5ODA2ODksInVzZXJfaWQiOiJwN1E2bDY5bjEzUnFkaXRpbHRhOE9JTkRGTEEzIiwic3ViIjoicDdRNmw2OW4xM1JxZGl0aWx0YThPSU5ERkxBMyIsImlhdCI6MTU2NDk4MDY4OSwiZXhwIjoxNTY0OTg0Mjg5LCJlbWFpbCI6ImluZmFtb3VzX2dvZGhhbmRAeWFob28uY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImluZmFtb3VzX2dvZGhhbmRAeWFob28uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.RpFWKZMDqVH6G0Y2kiF8iWo3ouo9PGk7u9qo29yGNA0gyZUCBNwu4BhRyyBGw5kcaPZXg0ywjAGZ2QzC3U0oND16bNTyHwAhM-rpGZOKQ3_29ZE9E1UXHSnCZ0hyVGQdEwXTbXM9cmnnvDqgl7HGIFdbrlgZQmmDVj_vYbXUGnlxW-oh9FMZGw7JYuE9WTaGztg3MSkGOcWV1BquuHJgGe-eMuA6sk1yrUKHxyxfXmDmu_ocshWXicq_TJ0jWZ1Vz9KOYT_FPK7UHZSxcl2HBbybO1v898qRp_FEREpw4gKN66w0nVjxKL5ixxuvtf3J1_lo3FThvnriW_1S_QTOrQ";

export default {
  fetchResource: async (req, res, next) => {
    const admin = req.app.get("auth");
    const db = req.app.get("db");
    let moodRef = db.collection("moods");
    let queryResult;
    let returnResult = [];

    const lookUpDate = req.query.day;
    const token = req.token;
    let check_result;
    let check_message;

    check_result = await checkToken(admin, token);

    if (!check_result) {
      const error = new Error("Token Error");
      error.statusCode = 401;
      return next(error);
    }
    //console.log(lookUpDate);

    try {
      queryResult = await moodRef.where("made", "==", lookUpDate).get();
      if (queryResult.empty) {
        check_message = "no result";
      } else {
        check_message = "result found";
        for (let doc of queryResult.docs) {
          //console.log(doc.data());
          returnResult.push(doc.data());
        }
      }
    } catch (err) {
      console.log(err);
    }
    // console.log("query object: ", queryResult);
    // console.log("query is it empty result:===> ", queryResult.empty);

    res.json({
      message: "Fetch resurce successful",
      data: { message: check_message, result: returnResult }
    });
  },
  addMood: async (req, res, next) => {
    const db = req.app.get("db");
    const admin = req.app.get("auth");
    const token = req.token;
    const timestamp = req.params.timestamp;
    const mood = req.body.mood;
    const description = req.body.description;
    let firebaseData;
    let url;
    let check_result;

    check_result = await checkToken(admin, token);

    if (!check_result) {
      const error = new Error("Token Error");
      error.statusCode = 401;
      return next(error);
    }
    const made = formatTime();

    let client = GphApiClient(process.env.GIPHY_KEY);
    let giphyResult;
    const giphyParams = {
      tag: mood,
      rating: "g"
    };
    try {
      giphyResult = await client.random("gifs", giphyParams);
      url = giphyResult.data.url;
    } catch (err) {
      console.log(err);
    }

    firebaseData = {
      uid: "128a",
      made,
      gifUrl: giphyResult.data.url,
      mood,
      timestamp,
      description
    };

    await db.collection("moods").add(firebaseData);

    res.json({ message: "route to store mood to database" });
  }
};
