const express = require("express");
const { sayhey } = require("../controllers/user");
const router = express.Router();

//routes
router.get("/", sayhey);

module.exports = router;
