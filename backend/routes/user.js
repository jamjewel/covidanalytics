const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

router.get("/userlog/:id", UserController.userLogin);

module.exports = router;
