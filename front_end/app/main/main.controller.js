(function () {
    'use strict';

    angular
    	.module('myApp')
    	.controller('MainController', MainController);

	// @ngInject
	MainController.$inject = ['$state', '$scope', '$rootScope', 'authentication'];

	function MainController($state, $scope, $rootScope, authentication) {
		var vm = this;

		vm.loggedIn = false;
		vm.logOut = logOut;

		if (!authentication.isLoggedIn()) {
			$state.go('app.login');
		}
		vm.currentState = $state.current.name;
		$rootScope.$on('$stateChangeSuccess', function(event, nextRoute, currentRoute) {
            vm.currentState = $state.current.name;
        });

		$rootScope.$on('logged-in', function() {
			vm.loggedIn = true;
		})
        // Methods
        function logOut() {
        	authentication.logout();
        	vm.loggedIn = false;
        	$state.go('app.login');
        }
	}
})();