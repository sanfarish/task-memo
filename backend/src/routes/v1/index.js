const express = require("express");
const router = express.Router();
const swaggerUI = require('swagger-ui-express');
const docs = require('../../docs/v1/openapi.json');

const todos = require("./todos.route");

// router.use("/images", express.static('public/images'));
router.use("/todos", todos);
// router.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));
// router.use("/", (req, res) => res.redirect(301, "/api/v1/docs"));

module.exports = router;
