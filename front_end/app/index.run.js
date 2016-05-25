(function ()
{
    'use strict';

    angular
        .module('myApp')
        .run(runBlock);

    /** @ngInject */
    runBlock.$inject = ['$rootScope', 'CompanyDetails', '$state', 'authentication']
    function runBlock($rootScope, CompanyDetails, $state, authentication)
    {
        $rootScope.$on('$stateChangeSuccess', function(event, nextRoute, currentRoute) {
            if (['app', 'app.company', 'app.test', 'app.employee'].indexOf($state.current.name) > -1 && !authentication.isLoggedIn()) {
                $state.go('app.login');
            }
        });
        // clean up company details cookie
        var det = {};
        CompanyDetails.setCompanyDetails(det);
        CompanyDetails.setSelectedEmployee(det);
    }
})();