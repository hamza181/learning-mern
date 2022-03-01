const HttpError = require("../models/http-error");
const uuid = require('uuid/v4');

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


//   function for get places 
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

// function for get places by user id 
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

// post function for create place
const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    // use destructing 
    // const title = req.body.title
    // const description = req.body.description
    // const coordinates = req.body.coordinates
    // const address = req.body.address
    // const creator = req.body.creator
    // these all lines are equal to the above one line

    const createdPlace = {
        // title: title
        // equal to the below line
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace)

    res.status(201).json({place: createdPlace})
}

exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId
exports.createPlace = createPlace