var mongoose = require('mongoose');
var Company = mongoose.model('Company');
var Employee = mongoose.model('Employee');
var Test = mongoose.model('Test');

// Add a new test for an employee with URL:
// <base URL>/api/companies/<_id>/employees/<_id>/tests
module.exports.testAddNew = function(req, res) {
	var compId = req.params.compId;
	var empId = req.params.empId;
	console.log("POST new test for employee: " + empId);

	Company
		.findById(compId, function(err, company) {
			if (err) {
				res
					.status(500)
					.json(err);
				return;
			}
			else {
				var employee = company.employees.id(empId);
				if (!employee) {
					res
						.status(500)
						.json({message: 'no employee id: ' + empId + ' was found for company: ' + compId});
					return;
				}
				var test = new Test();

				test.result = req.body.result;
				if (req.body.name) {
					test.name = req.body.name;
				}
				if (req.body.comment) {
					test.comment = req.body.comment;
				}
				employee.tests.push(test);

				company.save('employees', function(err, employee) {
					if (err) {
						res
							.status(500)
							.json(err);
					}
					else {
						res
							.status(200)
							.json({ message: 'New test for employee: ' + employee._id + ' from company: ' + compId + ' is added.'});
					}
				})
			}
		})
}
// Fetch all tests for an employee with URL:
// <base URL>/api/companies/<_id>/employees/<_id>/tests
module.exports.testGetAll = function(req, res) {
	var compId = req.params.compId;
	var empId = req.params.empId;

	Company
		.findById(compId)
		.select('employees')
		.exec(function(err, company) {
			if (err) {
				res
					.status(500)
					.json(err);
			}
			else {
				var employee = company.employees.id(empId);
				res
					.status(200)
					.json(employee.tests)
			}
		});
}

// Fetch a certain test for an employee with URL:
// <base URL>/api/companies/<_id>/employees/<_id>/tests/<_id>
module.exports.testGetOne = function(req, res) {
	var compId = req.params.compId;
	var empId = req.params.empId;
	var testId = req.params.testId;

	Company
		.findById(compId)
		.select('employees')
		.exec(function(err, company) {
			if (err) {
				res
					.status(500)
					.json(err);
			}
			else {
				var employee = company.employees.id(empId);
				var test = employee.tests.id(testId);
				if (!test) {
					res
						.status(500)
						.json("Employee " + empId + " has no such test: " + testId);
				}
				else {
					res
						.status(200)
						.json(test)

				}
			}
		});
}

// Update a test for an employee with URL:
// <base URL>/api/companies/<_id>/employees/<_id>/tests/<_id>
module.exports.testUpdate = function(req, res) {
	var compId = req.params.compId;
	var empId = req.params.empId;
	var testId = req.params.testId;
	console.log(req.body);
	Company
		.findById(compId)
		.select('employees')
		.exec(function(err, company) {
			if (err) {
				res
					.status(500)
					.json(err);
			}
			else {
				var employee = company.employees.id(empId);
				var test = employee.tests.id(testId);
				if (!test) {
					res
						.status(500)
						.json("Employee " + empId + " has no such test: " + testId);
				}
				else {
					if (req.body.result || req.body.result == "" ) {
						test.result = req.body.result;
					}
					if (req.body.name || req.body.name == "" ) {
						test.name = req.body.name;
					}
					if (req.body.comment || req.body.comment == "" ) {
						test.comment = req.body.comment;
					}
					company.save('employees', function(err, employee) {
						if (err) {
							res
								.status(500)
								.json(err);
						}
						else {
							res
								.status(200)
								.json("test id: " + testId + ' is updated.');
						}
					});
				}
			}
		});
}

// Delete a test for an employee with URL:
// <base URL>/api/companies/<_id>/employees/<_id>/tests/<_id>
module.exports.testDelete = function(req, res) {
	var compId = req.params.compId;
	var empId = req.params.empId;
	var testId = req.params.testId;

	Company
		.findById(compId)
		.select('employees')
		.exec(function(err, company) {
			if (err) {
				res
					.status(500)
					.json(err);
			}
			else {
				var employee = company.employees.id(empId);
				var test = employee.tests.id(testId);
				if (!test) {
					res
						.status(500)
						.json("Employee " + empId + " has no such test: " + testId);
					return;
				}
				else {
					test.remove();

					company.save('employees', function(err, employee) {
						if (err) {
							res
								.status(500)
								.json(err);
						}
						else {
							res
								.status(200)
								.json("test id: " + testId + ' is deleted.');
						}
					});
				}
			}
		});
}