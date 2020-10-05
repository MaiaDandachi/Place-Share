const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization : 'Bearer Token'
    if (!token) {
      // after split there was no token
      throw new Error("Authentication failed");
    }

    // verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next(); // let the req to continue to the belower routes
  } catch (err) {
    // there was an error while splitting
    const error = new HttpError("Authentication failed", 403);
    return next(error);
  }
};
