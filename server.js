var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');

var PORT = process.env.PORT || 8080;

var app = express();

// Outputs static content for the app
app.use(express.static("public"));

// parse application/url
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Import handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import routes and give server access
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});