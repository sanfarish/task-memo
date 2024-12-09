const asyncHandler = require("express-async-handler");
const { tasks } = require("../models");
const dbHandler = require("../utils/dbHandler");
const throwError = require("../utils/throwError");
const validationUtil = require("../utils/validationUtil");

const getAll = asyncHandler(async (req, res) => {
	const data = await tasks.findAll({
		order: [["createdAt", "DESC"]]
	});
	res.status(200).json(data);
});

const post = asyncHandler(async (req, res) => {
	validationUtil(req);
	const data = await dbHandler(tasks.create(
		{
			task: req.body.task,
			done: false
		}
	));
	res.status(201).json(data.dataValues);
});

const del = asyncHandler(async (req, res) => {
	validationUtil(req);
	const confirm = await dbHandler(tasks.destroy({
		where: { id: req.params.id }
	}));
	if (confirm !== 1) {
		throwError(400, "no task exists");
	};
	res.status(204).end();
});

const patch = asyncHandler(async (req, res) => {
	validationUtil(req);
	const confirm = await dbHandler(tasks.update(
		{ done: req.body.done },
		{ where: { id: req.params.id } }
	));
	if (confirm[0] !== 1) {
		throwError(400, "no task exists");
	};
	const data = await dbHandler(tasks.findByPk(req.params.id));
	res.status(200).json(data);
});

module.exports = { getAll, post, del, patch };
