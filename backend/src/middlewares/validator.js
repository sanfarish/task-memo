const { body, param } = require("express-validator");

const validator = {
    tasks: {
        post: [
            body("task", "invalid request").exists(),
            body("task", "accept string only").isString(),
            body("task", "the task cannot be empty").notEmpty(),
            body("task", "maximum task length is 128 characters").isLength({ max: 128 })
        ],
        del: [
            param("id", "parameter accept integer only").isInt()
        ],
        patch: [
            param("id", "parameter accept integer only").isInt(),
            body("done", "invalid request").exists(),
            body("done", "accept boolean only").isBoolean({ strict: true })
        ]
    }
};

module.exports = validator;
