const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  // get id from url
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  // res.send is used to send html
  // res.send('Hello from the backend!');

  if (!place) {
    // return res.status(404).json({
    //   message: "Place not found.",
    // });

    // const error = new Error('Could not find place')
    // error.code = 404;
    // throw error

    // get error from file we created http-error.js
    throw new HttpError("Could not find place", 404);
  }
  res.json({
    message: "Hello from the backend!",
    place: place,
  });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => p.creator === userId);

  if (!place) {
    // return res.status(404).json({
    //   message: "Place not found.",
    // });

    // const error = new Error('Could not find place')
    // error.code = 404;
    // return next(error)

    return next(new HttpError("Could not find place", 404));
  }

  res.json({ place });
};

exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId