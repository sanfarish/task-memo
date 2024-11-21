const models = require("../models");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getAll = asyncWrapper(async (req, res) => {
	const data = await models.todos.findAll({
		order: [["created_at", "DESC"]]
	});
	res.status(200).json(data);
});

const post = asyncWrapper(async (req, res) => {
	const data = await models.todos.create(
		{
			task: req.body.task,
			done: false,
			created_at: new Date(),
			updated_at: new Date()
		}
	);
	res.status(201).json({
		status: "success",
		data: data.dataValues,
	});
});

const del = asyncWrapper(async (req, res) => {
	await models.todos.destroy({
		where: { id: req.params.id }
	});
	res.status(204).end();
});

const patch = asyncWrapper(async (req, res) => {
	await models.todos.update(
		{ done: req.body.done },
		{ where: { id: req.params.id } }
	);
	const data = await models.todos.findByPk(req.params.id);
	res.status(200).json({
		status: "success",
		data,
	});
});

module.exports = { getAll, post, del, patch };
