const express = require("express");
const router = express.Router();
const todos = require("../../controllers/v1/todos.controller");

router.get("/", todos.getAll);
router.post("/", todos.create);
router.delete("/:id", todos.remove);
router.put("/:id", todos.update);

module.exports = router;
