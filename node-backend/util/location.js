const axios = require("axios");
const HttpError = require("../models/http-error");
// const API_KEY = "AIzaSyAZu2ajcWjMGYtsfSx_LJ8EyjDhDdys59Y";
const API_KEY = process.env.GOOGLE_API_KEY;

async function getCoordFromAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address",
      404
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordFromAddress;
