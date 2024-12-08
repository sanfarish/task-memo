const { tasks } = require("../models");
const asyncHandler = require("express-async-handler");

const getAll = asyncHandler(async (req, res) => {
	const data = await tasks.findAll({
		order: [["createdAt", "DESC"]]
	});
	res.status(200).json(data);
});

const post = asyncHandler(async (req, res) => {
	const data = await tasks.create(
		{
			task: req.body.task,
			done: false
		}
	);
	res.status(201).json({
		status: "success",
		data: data.dataValues,
	});
});

const del = asyncHandler(async (req, res) => {
	await tasks.destroy({
		where: { id: req.params.id }
	});
	res.status(204).end();
});

const patch = asyncHandler(async (req, res) => {
	await tasks.update(
		{ done: req.body.done },
		{ where: { id: req.params.id } }
	);
	const data = await tasks.findByPk(req.params.id);
	res.status(200).json({
		status: "success",
		data,
	});
});

module.exports = { getAll, post, del, patch };
