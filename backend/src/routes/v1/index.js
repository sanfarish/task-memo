const express = require("express");
const router = express.Router();
const swaggerUI = require('swagger-ui-express');
const docs = require('../../docs/openapi.json');

const tasks = require("./tasks.route");

router.use("/tasks", tasks);
router.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));
router.use("/", (req, res) => res.redirect(301, "/api/v1/docs"));

module.exports = router;
