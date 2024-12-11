const { body, param } = require("express-validator");

module.exports = {
    tasks: {
        post: [
            body("task", "task required").exists(),
            body("task", "task accept string only").isString(),
            body("task", "task cannot be empty").notEmpty(),
            body("task", "maximum task length is 128 characters").isLength({ max: 128 })
        ],
        del: [
            param("id", "parameter accept integer only").isInt()
        ],
        patch: [
            param("id", "parameter accept integer only").isInt(),
            body("done", "done required").exists(),
            body("done", "done accept boolean only").isBoolean({ strict: true })
        ]
    }
};
