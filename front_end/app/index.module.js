(function () {
    'use strict';

    /**
    * Main module of the Fuse
    */
    angular.module('myApp', [
    	// Application core
    	'app.core',

    	// Company module
    	'app.company',

    	// Employee module
    	'app.employee',

    	// Test module
    	'app.test',
	]);
})();