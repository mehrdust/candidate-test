(function () {
    'use strict';

    angular
    	.module('app.auth')
    	.controller('LoginController', LoginController);

	LoginController.$inject = ['$state', 'authentication'];
	function LoginController($state, authentication) {
		var vm = this;

		vm.error = null;
		vm.credentials = {
			email: '',
			password: ''
		};

		vm.onSubmit = function() {
			authentication
				.login(vm.credentials)
				.error(function(err) {
					vm.error = err.message;
				})
				.then(function() {
					vm.error = null;
					$state.go('app');
				}
			);
		}
	}
})();