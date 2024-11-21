const express = require("express");
const router = express.Router();
// const swaggerUI = require('swagger-ui-express');
// const docs = require('../../docs/openapi.json');

const todos = require("./todos.route");

router.use("/todos", todos);
// router.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));
// router.use("/", (req, res) => res.redirect(301, "/api/v1/docs"));

module.exports = router;
