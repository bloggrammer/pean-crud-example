const { authJwt } = require('../middleware');
const controller = require('../controllers/item.controller');
module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});
	app.post('/api/items', [authJwt.verifyToken], controller.create);
	app.get('/api/items', [authJwt.verifyToken], controller.findAll); //return items for dashboard
	app.delete('/api/items/:id', [authJwt.verifyToken], controller.delete);
};
