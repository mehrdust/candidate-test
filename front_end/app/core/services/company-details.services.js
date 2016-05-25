(function() {
	'use strict';

	angular
		.module('app.core')
		.service('CompanyDetails', CompanyDetails);

	CompanyDetails.$inject = ['$cookies', '$q'];
	function CompanyDetails($cookies, $q) {
		var CompanyDetails = {
			getCompanyDetails: getCompanyDetails,
			setCompanyDetails: setCompanyDetails
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
	}
})();