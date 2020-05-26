const Covidcountrywises = require("../models/global");
const DailywiseCountryDetails = require("../models/country");
const DailywiseCountryTimelineDetails = require("../models/countryTimeline");


exports.getAllCountrywise = (req, res, next) => {

  Covidcountrywises.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      result = result.sort((a, b) => parseFloat(b.cases) - parseFloat(a.cases));
      res.json(result);
    }
  });
};


exports.getDailywiseCountry = (req, res, next) => {
  console.log(req.params.id)
  DailywiseCountryDetails.find({location: req.params.id}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      result = result.sort(function(a,b){
        return new Date(a.date) - new Date(b.date)
      })
      res.json(result);
    }
  });
};

exports.getDailyTimelineWiseCountry = (req, res, next) => {
  console.log(req.params.id)
  DailywiseCountryTimelineDetails.find({Country: req.params.id}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      result = result.sort(function(a,b){
        return new Date(a.Date) - new Date(b.Date)
      })
      res.json(result);
    }
  });
};

exports.getTotalCaseDetails = (req, res, next) => {
  Covidcountrywises.find({country: 'World'}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

exports.getTop10Countries = (req, res, next) => {
  Covidcountrywises.find({}).sort({viewCount: -1}).limit(13).exec(function(err, result) {
    if (err) {
      console.log(err);
    } else {
      result = result.sort((a, b) => parseFloat(b.cases) - parseFloat(a.cases));
      res.json(result);
    }
  });
};

