const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
// require our routes/index.js file
const userRoutes = require("./routes");

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Now let's tell our app about those routes we made!
app.use(userRoutes);

app.get("/", (req, res, next) => {
  return res.redirect("/items");
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000");
});
