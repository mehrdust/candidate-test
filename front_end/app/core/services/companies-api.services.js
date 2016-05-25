(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('CompanyApi', CompanyApi);

		CompanyApi.$inject = ['$http'];
		function CompanyApi($http) {
			var CompanyApi = {
				getAllCompanies: getAllCompanies,
				getOneCompany  : getOneCompany,
				addNewCompany  : addNewCompany,
				updateCompany  : updateCompany,
				deleteCompany  : deleteCompany
			}
			return CompanyApi;

			// API methods for company
			function getAllCompanies() {
				return $http.get('api/companies/');
			}

			function getOneCompany(id) {
				return $http.get('api/companies/' + id);
			}

			function addNewCompany(data) {
				return $http.post('api/companies/', data);
			}

			function updateCompany(id, data) {
				return $http.put('api/companies/' + id, data);
			}

			function deleteCompany(id) {
				return $http.delete('api/companies/' + id);
			}

		}
})();