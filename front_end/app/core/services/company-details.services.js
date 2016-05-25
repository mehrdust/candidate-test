(function() {
	'use strict';

	angular
		.module('app.core')
		.service('CompanyDetails', CompanyDetails);

	CompanyDetails.$inject = ['$cookies', '$q'];
	function CompanyDetails($cookies, $q) {
		var CompanyDetails = {
			getCompanyDetails: getCompanyDetails,
			setCompanyDetails: setCompanyDetails,
			getSelectedEmployee: getSelectedEmployee,
			setSelectedEmployee: setSelectedEmployee,
		}

		return CompanyDetails;

		// Methods
		function getCompanyDetails() {
			var details = $cookies.get('companyDetails'),
				deferred = $q.defer();

			if (details) {
				deferred.resolve(JSON.parse(details));
			}
			else {
				deferred.reject('invalid cookie');
			}
			return deferred.promise;
		}
		function setCompanyDetails(value) {
			$cookies.put('companyDetails', JSON.stringify(value));
		}
		function getSelectedEmployee() {
			var employee = $cookies.get('sel_employee'),
				details = $cookies.get('companyDetails'),
				deferred = $q.defer();

			if (employee && details) {
				deferred.resolve(
					{
						employee: JSON.parse(employee),
						companyDetails: JSON.parse(details)
					});
			}
			else {
				deferred.reject('cannot find any cookie for selected employee');
			}
			return deferred.promise;
		}
		function setSelectedEmployee(value) {
			$cookies.put('sel_employee', JSON.stringify(value));
		}
	}
})();