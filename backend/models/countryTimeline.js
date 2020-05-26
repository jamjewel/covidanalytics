const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  Country: { type: String, required: true },
  CountryCode: { type: String, required: true },
  Province: { type: String, required: true },
  City: { type: String, required: true },
  CityCode: { type: String, required: true },
  Lat: { type: String, required: true },
  Lon: { type: String, required: true },
  Confirmed: { type: String, required: true },
  Deaths: { type: String, required: true },
  Recovered: { type: String, required: true },
  Active: { type: String, required: true },
  Date: { type: String, required: true }
});

module.exports = mongoose.model("dailytotalcountrywise", postSchema);
