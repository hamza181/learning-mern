const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();

// use route which we make in places-routes.js
app.use('/api/places', placesRoutes)

app.listen(5000);