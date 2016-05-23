var mongoose = require('mongoose');
var Company = mongoose.model('Company');

// Get list of all companies with URL: <base URL>/api/companies
module.exports.companiesGetAll = function(req, res) {
	console.log('Get all companies');
	console.log(req.query);

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
	console.log("POST new company");
	var company = new Company();
	company.name = req.body.name;
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

	Company
		.findById(id, function(err, company) {
			if (err) {
				res
					.status(500)
					.json(err);
			}
			else {
				company.name = req.body.name;

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