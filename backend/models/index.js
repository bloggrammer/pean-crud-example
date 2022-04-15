const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: 0,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);
db.item = require('./item.model.js')(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
	through: 'user_roles',
	foreignKey: 'roleId',
	otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
	through: 'user_roles',
	foreignKey: 'userId',
	otherKey: 'roleId',
});
db.user.hasMany(db.item, { as: 'items' });
db.item.belongsTo(db.user, {
	foreignKey: 'id',
	as: 'UserId',
});
db.ROLES = ['user', 'admin'];
module.exports = db;
