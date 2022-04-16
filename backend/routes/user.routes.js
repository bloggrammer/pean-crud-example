const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/user",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );
  app.get("/api/user/:id", [authJwt.verifyToken], controller.findOne);
};
