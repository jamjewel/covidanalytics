const express = require("express");

const GlobalController = require("../controllers/global");

const router = express.Router();

router.get("/all", GlobalController.getDailywiseCountry);

router.get("/getAllCountrywise", GlobalController.getAllCountrywise);

router.get("/totalDetails", GlobalController.getTotalCaseDetails);

router.get("/getTop10Countries", GlobalController.getTop10Countries);

router.get("/getTimelineCountrywise/:id", GlobalController.getDailyTimelineWiseCountry);

router.get("/country/:id", GlobalController.getDailywiseCountry);

module.exports = router;
