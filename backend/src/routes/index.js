const express = require("express");
const router = express.Router();
const v1 = require("./v1");

router.use("/v1", v1);
router.use("/", (req, res) => res.redirect(301, "/api/v1/docs"));

module.exports = router;
