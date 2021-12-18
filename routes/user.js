const express = require("express");
const { signup } = require("../controllers/user");
const router = express.Router();

//routes
router.post("/signup", signup);

module.exports = router;
