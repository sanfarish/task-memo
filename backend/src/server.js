#!/usr/bin/env node
require("dotenv").config();

const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`task-memo-backend listening on port ${port}`);
});
