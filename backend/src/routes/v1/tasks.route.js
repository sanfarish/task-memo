const express = require("express");
const router = express.Router();
const tasks = require("../../controllers/tasks.controller");
const validator = require("../../middlewares/validator");

router.get("/", tasks.getAll);
router.post("/", validator.tasks.post, tasks.post);
router.delete("/:id", validator.tasks.del, tasks.del);
router.patch("/:id", validator.tasks.patch, tasks.patch);

module.exports = router;
