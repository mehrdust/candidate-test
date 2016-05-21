(function () {
    'use strict';

    angular
    	.module('app.employee')
    	.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('app.employee', {
				url: '/employee',
				views: {
					'content@app': {
						templateUrl: 'app/main/employee/employee.html',
						controller: 'EmployeeController as vm'
					}
				}
			});
	}
})();