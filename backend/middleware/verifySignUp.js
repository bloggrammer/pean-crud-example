const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;
checkDuplicateEmail = (req, res, next) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	}).then((user) => {
		if (user) {
			res.status(400).send({
				message: 'An Account is Already Registered to that E-mail',
			});
			return;
		}
		next();
	});
};
checkRolesExisted = (req, res, next) => {
	if (req.body.roles) {
		for (let i = 0; i < req.body.roles.length; i++) {
			if (!ROLES.includes(req.body.roles[i])) {
				res.status(400).send({
					message:
						'The user role does not exist = ' + req.body.roles[i],
				});
				return;
			}
		}
	}

	next();
};
const verifySignUp = {
	checkDuplicateEmail: checkDuplicateEmail,
	checkRolesExisted: checkRolesExisted,
};
module.exports = verifySignUp;
