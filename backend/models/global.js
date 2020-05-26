const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  country: { type: String, required: true },
  cases: { type: String, required: true },
  todayCases: { type: String, required: true },
  deaths: { type: String, required: true },
  todayDeaths: { type: String, required: true },
  recovered: { type: String, required: true },
  active: { type: String, required: true },
  critical: { type: String, required: true },
  casesPerOneMillion: { type: String, required: true },
  deathsPerOneMillion: { type: String, required: true },
  totalTests: { type: String, required: true },
  testsPerOneMillion: { type: String, required: true },
});

module.exports = mongoose.model("covidcountrywise", postSchema);
