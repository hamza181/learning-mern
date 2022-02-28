const express = require("express");

// use router because in this file we have routes
const router = express.Router();

const placesControllers = require('../controllers/places-controllers')

router.get("/:pid", placesControllers.getPlaceById);

// send data to frontend according to userid uid
router.get("/user/:uid", placesControllers.getPlaceByUserId);

module.exports = router;
