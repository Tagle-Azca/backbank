const express = require("express");
const { getUsers } = require("../controllers/UserControllers");

const router = express.Router();

router.get("/", getUsers);

module.exports = router;
