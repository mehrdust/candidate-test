require('./back_end/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var proxy = require('angular-html5-proxy');
var cookieParser = require('cookie-parser');
var passport = require('passport');

// [SH] Bring in the data model
require('./back_end/data/db');
// [SH] Bring in the Passport config after model is defined
require('./back_end/config/passport');

// API routes
var routes = require('./back_end/routes');

// Set the designated port
app.set('port', 3000);

// Middleware to console log every request for transparency
app.use(function(req, req, next) {
	console.log("Method: " + req.req.method, '| URL:' + req.req.url);
	next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'front_end')));

// Initialise Passport before using the route middleware
app.use(passport.initialize());

// Enable parsing of posted forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// // error handlers

// // [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});

// Add some routing
app.use('/api', routes);

app.use(proxy({
	target: 'http://0.0.0.0:' + app.get('port')
}));
// listen for request
var server = app.listen(app.get('port'), function() {
	var port = server.address().port;
	console.log('Listening on port ' + port);
})
