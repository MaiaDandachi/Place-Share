const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

//-------------------------------------
const getUsers = async (req, res, next) => {
  let usersFound;
  try {
    // get the place object as well
    usersFound = await User.find({}, "-password").populate("places");
  } catch (error) {
    const err = new HttpError(
      "Fetching users failed, please try again laterr",
      500
    );
    return next(err);
  }
  res.json({
    users: usersFound.map((user) => user.toObject({ getters: true })),
  });
};

//------------------------------------
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data", 422));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError("Signup failed, please try again later", 500);
    return next(err);
  }

  if (existingUser) {
    const err = new HttpError("User Exists Already, Please login instead", 422);
    return next(err);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create user, try again later", 500);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    // image: req.file.path,
    image: req.file.location,
    password: hashedPassword,
    places: [],
  });
  try {
    await createdUser.save();
  } catch (error) {
    const err = new HttpError("Signup Failed", 500);
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    const err = new HttpError("Signup Failed", 500);
    return next(err);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

//--------------------------------------
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError("Login failed, please try again later", 500);
    return next(err);
  }

  if (!existingUser) {
    const err = new HttpError("Invalid Credentials, could not log you in", 403);
    return next(err);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    const err = new HttpError(
      "Could not log you in, please check your credentials",
      500
    );
    return next(err);
  }

  if (!isValidPassword) {
    const err = new HttpError(
      "Could not log you in, please check your credentials",
      500
    );
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    const err = new HttpError("LogIn Failed", 500);
    return next(err);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
