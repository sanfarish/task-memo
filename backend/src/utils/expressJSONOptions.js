const throwError = require("./throwError");

module.exports = {
    verify: (req, res, buf, encoding) => {
        try {
            JSON.parse(buf);
        } catch (error) {
            throwError(400, "invalid JSON");
        };
    }
};
