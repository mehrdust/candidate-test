(function () {
    'use strict';

    angular
    	.module('app.auth')
    	.config(config);

	// @ngInject
	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('app.login', {
				url: 'login',
				views:  {
					'content@app': {
						templateUrl: 'app/main/auth/login/login.html',
						controller: 'LoginController as vm'
					}
				}
			})
	}
})();