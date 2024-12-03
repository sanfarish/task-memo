const express = require("express");
const router = express.Router();
const tasks = require("../../controllers/tasks.controller");

router.get("/", tasks.getAll);
router.post("/", tasks.post);
router.delete("/:id", tasks.del);
router.patch("/:id", tasks.patch);

module.exports = router;
