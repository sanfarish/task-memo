const path = require("path");

const error = (err, req, res, next) => {
	if (err) {
		if (!err.code) {
			err.code = 500;
		};
		if (process.env.NODE_ENV !== "test") {
			console.error(err.code + " error: " + err.message);
		};
		return res.status(err.code).json({
			error: err.message
		});
	};
	next();
};

const notFound = (req, res) => {
	res.status(404).sendFile(path.join(__dirname, "../../public/404.html"));
};

module.exports = { error, notFound };
