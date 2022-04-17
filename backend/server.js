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
if (db.roleExits(1)) {
  //Don't drop database
  db.sequelize.sync();
} else {
  //Drop and re-sync db.
  db.sequelize.sync({ force: true }).then(() => {
    db.seedRoles();
  });
}
require("../backend/routes/auth.routes")(app);
require("../backend/routes/user.routes")(app);
require("../backend/routes/item.routes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
