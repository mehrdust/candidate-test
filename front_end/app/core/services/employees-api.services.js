(function () {
    'use strict';

    angular
    	.module('app.core')
    	.factory('EmployeeApi', EmployeeApi);

	EmployeeApi.$inject = ['$http'];
	function EmployeeApi($http) {
		var EmployeeApi = {
			getAllEmployees : getAllEmployees,
			getOneEmployee  : getOneEmployee,
			addNewEmployee  : addNewEmployee,
			updateEmployee  : updateEmployee,
			deleteEmployee  : deleteEmployee
		}
		return EmployeeApi;

		// Methods
		function getAllEmployees(compId) {
			return $http.get('api/companies/' + compId + '/employees');
		}
		function getOneEmployee(compId, empId) {
			return $http.get('api/companies/' + compId + '/employees/' + empId);
		}
		function addNewEmployee(compId, data) {
			return $http.post('api/companies/' + compId + '/employees', data);
		}
		function updateEmployee(compId, empId, data) {
			return $http.put('api/companies/' + compId + '/employees/' + empId, data);
		}
		function deleteEmployee(compId, empId) {
			return $http.delete('api/companies/' + compId + '/employees/' + empId);
		}
	}
})();