var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/emp_test';

mongoose.connect(dburl);

// Connection Events
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection failed ' + err);
});
mongoose.connection.on('disconnected', function() {
	console.log("Mongoose disconnected");
});

// Capture App termination / restart events to be called
// when process is restarted / terminated
function gracefulShutdown(msg, callback) {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected through " + msg);
		callback();
	});
}

// Application SCHEMAS & MODELS
require('./companies.model');
require('./users.model');