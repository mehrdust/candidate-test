(function () {
    'use strict';

    angular
    	.module('myApp')
    	.config(routeConfig);

    	//  @ngInject
    	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    	function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)
    	{
    		$locationProvider.html5Mode(true);
    		$urlRouterProvider.otherwise('/');

    		// state definitions
    		$stateProvider
    			.state('app', {
    				url: '/',
    				views: {
    					'main': {
    						templateUrl: 'app/core/layouts/content.html',
    						// controller: 'MainController as vm'
    					}
    				}
    			});
    	}
})();