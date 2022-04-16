const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("../backend/models");
const Role = db.role;
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and re-sync db.');
// 	initial();
// });
// function initial() {
// 	Role.create({
// 		id: 1,
// 		name: 'user',
// 	});
// 	Role.create({
// 		id: 3,
// 		name: 'admin',
// 	});
// }
require("../backend/routes/auth.routes")(app);
require("../backend/routes/user.routes")(app);
require("../backend/routes/item.routes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
