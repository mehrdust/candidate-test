(function () {
    'use strict';

    /**
    * Main module of the Fuse
    */
    angular.module('myApp', [
    	// Application core
    	'app.core',

        // Authentication module
        'app.auth',

    	// Company module
    	'app.company',

    	// Employee module
    	'app.employee',

    	// Test module
    	'app.test',
	]);
})();