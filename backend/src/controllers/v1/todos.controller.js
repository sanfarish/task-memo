const models = require("../../models");
const asyncWrapper = require("../../middlewares/asyncWrapper");

const getAll = asyncWrapper(async (req, res) => {
	const data = await models.todos.findAll({
		order: [["created_at", "DESC"]]
	});
	res.status(200).json(data);
});

const create = asyncWrapper(async (req, res) => {
	const data = await models.todos.create({
		todo: req.body.todo,
		finished: false,
		created_at: new Date(),
		updated_at: new Date()
	});
	res.status(201).json({
		status: "success",
		data: data.dataValues,
	});
});

const remove = asyncWrapper(async (req, res) => {
	await models.todos.destroy({
		where: {
			id: req.params.id,
		},
	});
	res.status(204).end();
});

const update = asyncWrapper(async (req, res) => {
	await models.todos.update(
		{
			finished: req.body.finished,
		},
		{
			where: {
				id: req.params.id,
			},
		},
	);
	const data = await models.todos.findByPk(req.params.id);
	res.status(200).json({
		status: "success",
		data,
	});
});

module.exports = { getAll, create, remove, update };
