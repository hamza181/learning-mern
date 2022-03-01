const HttpError = require("../models/http-error");
const uuid = require("uuid/v4");

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

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = DUMMY_USERS.find((u) => u.email === email);
  if (existingUser) {
    throw new HttpError("User exists already", 422);
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const user = DUMMY_USERS.find((u) => u.email === email);

  if (!user || user.password !== password) {
    throw new HttpError("Could not find user with given credentials", 401);
  }

  res.json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
