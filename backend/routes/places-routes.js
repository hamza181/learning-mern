const express = require("express");

// use router because in this file we have routes
const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484445,
      lng: -73.9856646,
    },
    address: "asdf",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  // get id from url
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  // res.send is used to send html
  // res.send('Hello from the backend!');

  if (!place) {
    // return res.status(404).json({
    //   message: "Place not found.",
    // });

    const error = new Error('Could not find place')
    error.code = 404;
    throw error
  }
  res.json({
    message: "Hello from the backend!",
    place: place,
  });
});

// send data to frontend according to userid uid
router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => p.creator === userId);

  if (!place) {
    // return res.status(404).json({
    //   message: "Place not found.",
    // });

    const error = new Error('Could not find place')
    error.code = 404;
    return next(error)
  }

  res.json({ place });
});

module.exports = router;
