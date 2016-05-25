(function () {
    'use strict';

    angular
    	.module('app.core')
    	.factory('TestApi', TestApi);

	TestApi.$inject = ['$http'];
	function TestApi($http) {
		var TestApi = {
			addNewTest: addNewTest,
			updateTest: updateTest,
			deleteTest: deleteTest
		};

		return TestApi;

		// Methods
		function addNewTest(compId, empId, data) {
			return $http.post('api/companies/' + compId + '/employees/' + empId + '/tests', data);
		}
		function updateTest(compId, empId, testId, data) {
			return $http.put('api/companies/' + compId + '/employees/' + empId + '/tests/' + testId, data);
		}
		function deleteTest	(compId, empId, testId) {
			return $http.delete('api/companies/' + compId + '/employees/' + empId + '/tests/' + testId);
		}
	}
})();