var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
	name: String,
	testDate: {
		type: Date,
		"default": Date.now
	},
	result: {
		type: String,
		required: true,
		enum: ['fail', 'pass']
	},
	comment: String
});

var employeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	phone: String,
	email: String,
	tests: [testSchema]
});

var companySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	employees: [employeeSchema]
});

mongoose.model('Company', companySchema);
mongoose.model('Employee', employeeSchema);
mongoose.model('Test', testSchema);