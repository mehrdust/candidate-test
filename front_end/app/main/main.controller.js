(function () {
    'use strict';

    angular
    	.module('myApp')
    	.controller('MainController', MainController);

	// @ngInject
	MainController.$inject = ['$state', '$scope', '$rootScope'];

	function MainController($state, $scope, $rootScope) {
		var vm = this;

		vm.currentState = $state.current.name;
		console.log(vm.currentState);

		$scope.$on('state-changed', function(event, args) {
			vm.currentState = args.state;
		})
	}


})();