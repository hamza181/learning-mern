const HttpError = require("../models/http-error");
const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../utils/location");
const Place = require("../models/place");

let DUMMY_PLACES = [
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
const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (!places || places.length === 0) {
    // return res.status(404).json({
    //   message: "Place not found.",
    // });

    // const error = new Error('Could not find place')
    // error.code = 404;
    // return next(error)

    return next(new HttpError("Could not find place", 404));
  }

  res.json({ places });
};

// post function for create place
const createPlace = async (req, res, next) => {
  // for validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;
  // use destructing
  // const title = req.body.title
  // const description = req.body.description
  // const coordinates = req.body.coordinates
  // const address = req.body.address
  // const creator = req.body.creator
  // these all lines are equal to the above one line

  let coordinates = getCoordsForAddress(address);

  // const createdPlace = {
  //   // title: title
  //   // equal to the below line
  //   id: uuid(),
  //   title,
  //   description,
  //   location: coordinates,
  //   address,
  //   creator,
  // };

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    creator,
    image: 'https://images.unsplash.com/photo-1558981402-d8f9d9d8f9d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  });

  // store data in monogoDB
  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  // DUMMY_PLACES.push(createdPlace);
  

  res.status(201).json({ place: createdPlace });
};

// function for update place
const updatePlace = (req, res, next) => {
  // for validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const placeId = req.params.pid;
  const { title, description } = req.body;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  console.log(updatedPlace, title);

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ updatedPlace });
};

// function for delete place
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find place for this id", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
