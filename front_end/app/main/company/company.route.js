(function () {
    'use strict';

    angular
    	.module('app.company')
    	.config(config);

	// @ngInject
	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('app.company', {
				url: 'company',
				views:  {
					'content@app': {
						templateUrl: 'app/main/company/company.html',
						controller: 'CompanyController as vm'
					}
				}
			})
	}
})();