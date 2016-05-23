var express = require('express');
var router  = express.Router();

var ctrlCompanies 	= require('../controllers/companies.controllers.js');
// var ctrlEmployees 	= require('../controllers/employees.controllers.js');
// var ctrlTests 		= require('../controllers/tests.controllers.js');

	router.get('/', function(req, res) {
		res.json({message: 'Fuck you, go get some rest for fuck\'s sake!!'});
	});
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
// TODO

// Tests Routes
// TODO

module.exports = router;