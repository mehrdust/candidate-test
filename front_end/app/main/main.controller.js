(function () {
    'use strict';

    angular
    	.module('myApp')
    	.controller('MainController', MainController);

	// @ngInject
	MainController.$inject = ['$scope', '$rootScope'];

	function MainController($scope, $rootScope) {
	}


})();