const path = require("path");

const error = (err, req, res, next) => {
	if (err) {
		console.error(err.message);
		if (!err.code) {
			err.code = 500;
		}
		return res.status(err.code).json({
			message: err.message,
		});
	}
	next();
};

const notFound = (req, res) => {
	res.status(404).sendFile(path.join(__dirname, "../../public/404.html"));
};

module.exports = { error, notFound };
