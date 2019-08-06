export const checkHeader = (req, res, next) => {
  let token;

  if (!req.headers.authorization) {
    const error = new Error("No auth in header");
    return next(error);
  }
  token = req.headers.authorization.split(" ")[1];
  //console.log(token);
  req.token = token;
  next();
};
