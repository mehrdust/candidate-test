var express = require('express');
var router  = express.Router();

var ctrlCompanies 	= require('../controllers/companies.controllers.js');
var ctrlEmployees 	= require('../controllers/employees.controllers.js');
var ctrlTests 		= require('../controllers/tests.controllers.js');

// Company Routes
	router
		.route('/companies')
		.post(ctrlCompanies.companyAddNew)

	router
		.route('/companies')
		.get(ctrlCompanies.companiesGetAll);

	router
		.route('/companies/:compId')
		.get(ctrlCompanies.companiesGetOne);

	router
		.route('/companies/:compId')
		.put(ctrlCompanies.companyUpdate);

	router
		.route('/companies/:compId')
		.delete(ctrlCompanies.companyDelete);

// Employees Routes
	router
		.route('/companies/:compId/employees')
		.post(ctrlEmployees.employeeAddNew);

	router
		.route('/companies/:compId/employees')
		.get(ctrlEmployees.employeesGetAll);

	router
		.route('/companies/:compId/employees/:empId')
		.get(ctrlEmployees.employeesGetOne);

	router
		.route('/companies/:compId/employees/:empId')
		.put(ctrlEmployees.employeeUpdate);

	router
		.route('/companies/:compId/employees/:empId')
		.delete(ctrlEmployees.employeeDelete);

// Tests Routes
// TODO
	router
		.route('/companies/:compId/employees/:empId/tests')
		.post(ctrlTests.testAddNew);

	router
		.route('/companies/:compId/employees/:empId/tests')
		.get(ctrlTests.testGetAll);

	router
		.route('/companies/:compId/employees/:empId/tests/:testId')
		.get(ctrlTests.testGetOne);

	router
		.route('/companies/:compId/employees/:empId/tests/:testId')
		.put(ctrlTests.testUpdate);

	router
		.route('/companies/:compId/employees/:empId/tests/:testId')
		.delete(ctrlTests.testDelete);

module.exports = router;