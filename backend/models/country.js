const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  iso_code: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  total_cases: { type: String, required: true },
  new_cases: { type: String, required: true },
  total_deaths: { type: String, required: true },
  new_deaths: { type: String, required: true },
  total_cases_per_million: { type: String, required: true },
  new_cases_per_million: { type: String, required: true },
  total_deaths_per_million: { type: String, required: true },
  new_deaths_per_million: { type: String, required: true },
  total_tests: { type: String, required: true },
  new_tests: { type: String, required: true },
  total_tests_per_thousand: { type: String, required: true },
  new_tests_per_thousand: { type: String, required: true },
  tests_units: { type: String, required: true },
  population: { type: String, required: true },
  population_density: { type: String, required: true },
  median_age: { type: String, required: true },
  aged_65_older: { type: String, required: true },
  aged_70_older: { type: String, required: true },
  gdp_per_capita: { type: String, required: true },
  extreme_poverty: { type: String, required: true },
  cvd_death_rate: { type: String, required: true },
});

module.exports = mongoose.model("dailywise", postSchema);
