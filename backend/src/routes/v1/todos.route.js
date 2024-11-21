const express = require("express");
const router = express.Router();
const todos = require("../../controllers/todos.controller");

router.get("/", todos.getAll);
router.post("/", todos.post);
router.delete("/:id", todos.del);
router.patch("/:id", todos.patch);

module.exports = router;
