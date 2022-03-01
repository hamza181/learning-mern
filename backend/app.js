const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();

app.use(bodyParser.json())

// use route which we make in places-routes.js
app.use('/api/places', placesRoutes)

// this middleware is used to handle errors
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }

    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occured'})
});

app.listen(5000);