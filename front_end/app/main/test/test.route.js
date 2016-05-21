(function () {
    'use strict';

    angular
    	.module('app.test')
    	.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('app.test', {
				'url': 'test',
				'views': {
					'content@app': {
						templateUrl: 'app/main/test/test.html',
						controller: 'TestController as vm'
					}
				}
			});
	}
})();