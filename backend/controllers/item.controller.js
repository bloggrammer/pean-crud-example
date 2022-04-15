const db = require('../models');
const Item = db.item;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	// Validate request
	if (!req.body.title) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
		return;
	}
	// Create a item
	const item = {
		title: req.body.title,
		description: req.body.description,
		dueDate: req.body.dueDate,
		tag: req.body.tag,
		userId: req.userId,
	};
	// Save item in the database
	Item.create(item)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the Item.',
			});
		});
};

exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
	Item.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving items.',
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	Item.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Item was deleted successfully!',
				});
			} else {
				res.send({
					message: `Cannot delete item with id=${id}. Maybe item was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete item with id=' + id,
			});
		});
};
