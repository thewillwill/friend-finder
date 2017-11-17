// Dependencies
// =============================================================

// NPM
//---------------------------------------
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;



// Starts the server to begin listening
// =============================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

//Routing
//---------------------------------------
require('./routing/apiRoutes.js')(app);
require('./routing/htmlRoutes.js')(app);