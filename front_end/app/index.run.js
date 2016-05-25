(function ()
{
    'use strict';

    angular
        .module('myApp')
        .run(runBlock);

    /** @ngInject */
    runBlock.$inject = ['$rootScope', 'CompanyDetails']
    function runBlock($rootScope, CompanyDetails)
    {
        // clean up company details cookie
        var det = {};
        CompanyDetails.setCompanyDetails(det);
        CompanyDetails.setSelectedEmployee(det);
    }
})();