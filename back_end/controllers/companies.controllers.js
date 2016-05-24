var mongoose = require('mongoose');
var Company = mongoose.model('Company');

// Get list of all companies with URL: <base URL>/api/companies
module.exports.companiesGetAll = function(req, res) {
	console.log('Get all companies');
	Company
		.find(function(err, companies) {
			if (err) {
				res
					.status(500)
					.send(err);
			}
			else {
				res
				.status(200)
				.json(companies);
			}
		});
}

// Get an individual company with URL: <base URL>/api/companies/<_id>
module.exports.companiesGetOne = function(req, res) {
	var id = req.params.compId;
	Company
		.findById(id, function(err, company) {
			if (err) {
				res
					.status(500)
					.json(err);
			}
			else {
				res
					.status(200)
					.json(company);
			}
		});
}

// Add a new company with URL: <base URL>/api/companies
module.exports.companyAddNew = function(req, res) {
	console.log("POST Added new company");
	console.log(req.body);
	var company = new Company();
	company.name = req.body.name;
	company.description = req.body.description;
	company.save(function(err) {
		if (err) {
			res
				.status(500)
				.json(err);
		}
		else {
			res
				.status(201)
				.json({ message: 'new company created!'});
		}
	})
}

// Update an individual company with URL: <base URL>/api/companies/<_id>
module.exports.companyUpdate = function(req, res) {
	var id = req.params.compId;
	console.log("Updating company: ", id);
	console.log(req.query);

	Company
		.findById(id, function(err, company) {
			if (err) {
				res
					.status(500)
					.json(err);
			}
			else {
				if (req.body.name) {
					company.name = req.body.name;
				}
				if (req.body.description) {
					company.description = req.body.description;
				}
				// Update the retrieved company
				company.save(function(err) {
					if (err) {
						res
							.status(500)
							.json(err);
					}
					else {
						res
							.status(200)
							.json({ message: 'Company id: ' + id + ' updated.'});
					}
				})
			}
		});
}

// Delete an individual company with URL: <base URL>/api/companies/<_id>
module.exports.companyDelete = function(req, res) {
	var id = req.params.compId;
	console.log("Deleting company: ", id);

	Company
		.remove({
			_id: id
		}, function(err, company) {
			if (err) {
				res
					.status(500)
					.json(err);
			}
			else {
				res
					.status(200)
					.json({ message: 'Company id: ' + id + ' deleted.'});
			}
		})
}