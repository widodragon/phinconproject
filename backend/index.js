// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
var db = require("./config/index.js");
const PokemonController = require("./controller/pokemonController");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const passport = require("passport");
require("./config/passport")(passport);
require("dotenv").config();

// defining the Express app
const app = express();
app.use(
  session({
    store: new RedisStore({
      url: `redis://localhost`,
    }),
    secret: "my-strong-secret",
    resave: false,
    port: process.env.PORT,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// defining an array to work as the database (temporary solution)
const ads = [{ title: "Hello, world (again)!" }];
// adding Helmet to enhance your API's security
app.use(helmet());
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan("combined"));
// defining an endpoint to return all ads
app.get("/", (req, res) => {
  res.send(ads);
});
//adding public folder as static url
app.use(express.static("public"));
/*=================================>user api<================================*/
app.get("/api/v1/my-pokemon", PokemonController.index);
app.post("/api/v1/get-pokemon", PokemonController.create);
app.post("/api/v1/add-nickname", PokemonController.update);
app.post("/api/v1/rename", PokemonController.rename);
app.delete("/api/v1/delete", PokemonController.delete);

// starting the server
app.listen(process.env.PORT, function () {
  console.log(
    "your url (" + process.env.HOSTNAME + ":" + process.env.PORT + ")"
  );
});
