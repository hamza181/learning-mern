const express = require("express");
const { check } = require("express-validator");

// use router because in this file we have routes
const router = express.Router();

const placesControllers = require("../controllers/places-controllers");

router.get("/:pid", placesControllers.getPlaceById);

// send data to frontend according to userid uid
router.get("/user/:uid", placesControllers.getPlacesByUserId);

// router.post("/", placesControllers.createPlace);
// add check for validation and in check function insert those field that are required to validate
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ max: 200, min: 5 }),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ max: 200, min: 5 }),
  ],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
