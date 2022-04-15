module.exports = (sequelize, Sequelize) => {
	const Todo = sequelize.define('items', {
		title: {
			type: Sequelize.STRING,
		},
		description: {
			type: Sequelize.STRING,
		},
		dueDate: {
			type: Sequelize.DATE,
		},
		tag: {
			type: Sequelize.STRING,
		},
	});
	return Todo;
};
