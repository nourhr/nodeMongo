const express = require("express");


// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to store application." });
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/user.routes")(app);

const authRoutes = require("./app/routes/auth.routes");
app.use("/api/auth", authRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const eurekaHelper = require('./app/config/eureka-helper');
eurekaHelper.registerWithEureka('user-service', PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
