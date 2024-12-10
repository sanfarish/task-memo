const path = require("path");

const error = (err, req, res, next) => {
    if (err) {
        if (process.env.NODE_ENV !== "test") {
            console.error((err.code || 500) + " error: " + err.message);
        };
        return res.status(err.code || 500).json({
            error: err.message
        });
    };
    next();
};

const notFound = (req, res) => {
    return res.status(404).sendFile(path.join(__dirname, "../../public/404.html"));
};

module.exports = { error, notFound };
