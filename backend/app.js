const express = require("express");
const bodyParser = require("body-parser");
const mongoPractice = require("./mongo");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.post('/mongo', mongoPractice.createProduct);

// use route which we make in places-routes.js
app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

// this is used for error handling
app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

// this middleware is used to handle errors
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

app.listen(5000);
