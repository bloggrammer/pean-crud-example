const db = require('../models');
const User = db.user;

exports.findOne = (req, res) => {
	const id = req.params.id;
	User.findByPk(id)
		.then((data) => {
			if (data) {
				res.send({
					id: data.id,
					username: data.username,
					email: data.email,
				});
			} else {
				res.status(404).send({
					message: `Cannot find user with id=${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error retrieving user with id=${id}.`,
			});
		});
};
exports.findAll = (req, res) => {
	User.findAll()
		.then((data) => {
			let users = [];
			data.forEach((o) => {
				const user = {
					id: o.id,
					username: o.username,
					email: o.email,
				};
				users.push(user);
			});
			res.send(users);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving users.',
			});
		});
};
