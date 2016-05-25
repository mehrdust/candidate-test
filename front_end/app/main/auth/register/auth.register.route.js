(function () {
    'use strict';

    angular
    	.module('app.auth')
    	.config(config);

	// @ngInject
	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('app.register', {
				url: 'register',
				views:  {
					'content@app': {
						templateUrl: 'app/main/auth/register/register.html',
						controller: 'RegisterController as vm'
					}
				}
			})
	}
})();