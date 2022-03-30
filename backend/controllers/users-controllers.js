const HttpError = require("../models/http-error");
const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const User = require("../models/user");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Max",
    email: "max@gmail.com",
    password: "123",
  },
  {
    id: "u2",
    name: "Manu",
    email: "manu@gmail.com",
    password: "123",
  },
];

const getUsers = async (req, res, next) => {
  // res.json({ users: DUMMY_USERS });
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later",
      500
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  // for validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  // const existingUser = DUMMY_USERS.find((u) => u.email === email);

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError("User exists already", 422);
    return next(error);
  }

  // const createdUser = {
  //   id: uuid(),
  //   name,
  //   email,
  //   password,
  // };

  const createdUser = new User({
    name,
    email,
    password,
    // image: req.file.path,
    image:
      "https://images.unsplash.com/photo-1588677978409-b8b9f8f8d8f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  // DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // const user = DUMMY_USERS.find((u) => u.email === email);

  // if (!user || user.password !== password) {
  //   throw new HttpError("Could not find user with given credentials", 401);
  // }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again.", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Could not find user with given credentials",
      401
    );
    return next(error);
  }

  res.json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
