const path = require("path");

const error = (err, req, res, next) => {
	if (err) {
		console.error(err);
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		return res.status(err.statusCode).json({
			message: err.message.toLowerCase(),
		});
	}
	next();
};

const notFound = (req, res) => {
	res.status(404).sendFile(path.join(__dirname, "../../public/404.html"));
};

module.exports = { error, notFound };
