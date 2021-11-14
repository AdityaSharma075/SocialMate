const express = require("express");
const home_controller = require("../controllers/home_controller");

const router = express.Router();

router.get("/", home_controller.home);
router.use("/user", require("./user"));

module.exports = router;
