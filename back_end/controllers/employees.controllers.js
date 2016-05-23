var mongoose = require('mongoose');
var Company = mongoose.model('Company');
var Employee = mongoose.model('Employee');

// Add a new employee with URL: <base URL>/api/companies/<_id>/employees/
module.exports.employeeAddNew = function(req, res) {
	console.log("POST new employee");

	var compId = req.params.compId;
	// building the employee object
	Company
		.findById(compId, function(err, company) {
			if (err) {
				res
					.status(500)
					.json(err);
			}
			else {
				var employee = new Employee();
				employee.name = req.body.name;

				if (req.body.phone) {
					employee.phone = req.body.phone;
				}
				if (req.body.email) {
				 	employee.email = req.body.email;
				}
				employee.save(function(err) {
					if (err) {
						res
							.status(500)
							.json(err);
					}
					else {
						company.employees.push(employee);
						company.save('employees', function(err, employee) {
							if (err) {
								res
									.status(500)
									.json(err);
							}
							else {
								res
									.status(201)
									.json({ message: 'New employee: ' + employee._id + ' is created under company: ' + compId});
							}
						});
					}
				});
			}
		});
}

// Get list of all employees with URL: <base URL>/api/companies/<_id>/employees
module.exports.employeesGetAll = function(req, res) {
	var  compId = req.params.compId;
	console.log('Get all employees from company: ' + compId);

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
				if (company.employees.length == 0) {
					res
						.status(200)
						.json({ message: 'There are no employees defined for company: ' + compId})
				}
				else {
					res
						.status(200)
						.json(company.employees);
				}
			}
		});
}

// Get an individual employee from a given company with
// URL: <base URL>/api/companies/<_id>/employees
module.exports.employeesGetOne = function(req, res) {
	var compId = req.params.compId;
	var empId = req.params.empId;
	console.log("Get employee: " + empId + " from company: " + compId);

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
					.json(employee);
			}
		});
}

// Update an individual employee from a given company with
// URL: <base URL>/api/companies/<_id>/employees/<_id>
module.exports.employeeUpdate = function(req, res) {
	var compId = req.params.compId;
	var empId = req.params.empId;
	console.log("Update employee: " + empId + " from company: " + compId);
	Company.findById(compId, function(err, company) {
		if (err) {
			res
				.status(500)
				.json(err);
		}
		else {
			var employee = company.employees.id(empId);
			if (!employee) {
				res
					.status(500)
					.json('No employee with Id: ' + empId + ' was found for company: ' + compId);
				return;
			}
			if (req.body.name) {
				employee.name = req.body.name;
			}
			if (req.body.email) {
				employee.email = req.body.email;
			}
			if (req.body.phone) {
				employee.phone = req.body.phone;
			}
			employee.save(function(err) {
				if (err) {
					res
						.status(500)
						.json(err);
				}
				else {
					company.save('employees', function(err, employee) {
						if (err) {
							res
								.status(500)
								.json(err);
						}
						else {
							res
								.status(200)
								.json({ message: 'employee: ' + employee._id + ' from company: ' + compId + ' is updated.'});
						}
					});
				}
			})
		}
	})
}

// Delete an individual employee from a given company with
// URL: <base URL>/api/companies/<_id>/employees/<_id>
module.exports.employeeDelete = function(req, res) {
	var compId = req.params.compId;
	var empId = req.params.empId;
	console.log("Delete employee: " + empId + " from company: " + compId);
	Company.findById(compId, function(err, company) {
		if (err) {
			res
				.status(500)
				.json(err);
		}
		else {
			var employee = company.employees.id(empId);
			if (!employee) {
				res
					.status(500)
					.json('No employee with Id: ' + empId + ' was found for company: ' + compId);
				return;
			}
			employee.remove();
			company.save(function(err) {
				if (err) {
					res
						.status(500)
						.json(err);
				}
				else {
					res
						.status(200)
						.json('Successfully deleted employee: ' + empId + ' from company: ' + compId);
				}

			})
		}
	})
}