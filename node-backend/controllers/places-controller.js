const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const fs = require("fs");
const HttpError = require("../models/http-error");
const getCoordFromAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");

//-------------------------------------
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError("something went wrong, can't find a place", 500);
    return next(err);
  }

  if (!place) {
    const error = new HttpError("Could not fin a place with this id", 404);
    return next(error);
  }
  // getters: true is to keep the id while converting themongoose obj to js obj
  res.json({ place: place.toObject({ getters: true }) }); // => { place } => { place: place }
};

//---------------------------------------
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    const err = new HttpError(
      "something went wrong while fetching places",
      500
    );
    return next(err);
  }

  if (!places || places.length === 0) {
    return next(new HttpError("Could not find places with this user id", 404));
  }
  // use map bcz find returns an array
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  }); // => { place } => { place: place }
};

//--------------------------------------

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs, please check your data", 422));
  }
  const { title, description, address } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordFromAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    creator: req.userData.userId,
    location: coordinates,
    image: req.file.location,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (error) {
    const err = new HttpError("Creating place failed", 500);
    return next(err);
  }

  if (!user) {
    const err = new HttpError("Could not find user for the provided Id ", 404);
    return next(err);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save();
    user.places.push(createdPlace);
    await user.save();
    await sess.commitTransaction();
  } catch (error) {
    const err = new HttpError("Creating place failed", 500);
    return next(err);
  }
  res.status(201).json({ place: createdPlace });
};

//------------------------------------
const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data", 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError("something went wrong, can't update place", 500);
    return next(err);
  }

  if (place.creator.toString() !== req.userData.userId) {
    // the user who looged in and creator ony can update
    const err = new HttpError("You are not allowed to edit this place ", 401);
    return next(err);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    const err = new HttpError("Updating place failed", 500);
    return next(err);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

//-------------------------------------------
const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (error) {
    const err = new HttpError("something went wrong, can't delete place", 500);
    return next(err);
  }

  if (!place) {
    const err = new HttpError("Could not find a place for that id", 404);
    return next(err);
  }

  if (place.creator.id !== req.userData.userId) {
    const err = new HttpError("You are not allowed to delete this place ", 401);
    return next(err);
  }

  const imagepath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    const err = new HttpError("something went wrong, can't delete place", 500);
    return next(err);
  }

  fs.unlink(imagepath, (error) => {
    console.log(error);
  });
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
