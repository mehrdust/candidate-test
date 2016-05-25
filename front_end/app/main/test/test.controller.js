(function () {
    'use strict';

    angular
    	.module('app.test')
    	.controller('TestController', TestController);

	TestController.$inject = ['$rootScope', '$http', '$state', 'CompanyDetails', 'TestApi'];
	function TestController($rootScope, $http, $state, CompanyDetails, TestApi) {
		var vm = this;
		vm.selectedTest = -1;
		vm.tests = [];
		// methods
		vm.removeConfirmTest = removeConfirmTest;
		vm.addNewTest = addNewTest;
		vm.editTest = editTest;
		vm.removeTest = removeTest;
		vm.manageTest = manageTest;

		// Activate controller
		activate();

		function activate() {
			$rootScope.$broadcast('state-changed', { state: $state.current.name});
			CompanyDetails.getSelectedEmployee()
				.then(function(data) {
					vm.companyDetails = data.companyDetails;
					vm.selectedEmployee = data.employee;
					vm.tests = data.employee.tests;
				},
				function() {
					vm.companyDetails = {};
					vm.selectedEmployee = {};
				}
			);
		}
		function addNewTest() {
			vm.selectedTest = -1;
			$('#frmTest').modal();
		}
		function removeConfirmTest(index) {
			vm.selectedTest = index;
			$('#confirm-delete').modal();
		}
		function editTest(index) {
			vm.selectedTest = index;
			$('#testResult').val(vm.tests[vm.selectedTest].result);
			$('#frmTest').modal();
		}
		function removeTest() {
			if (vm.selectedTest > -1 && vm.companyDetails._id && vm.selectedEmployee._id) {
				TestApi.deleteTest(
					vm.companyDetails._id,
					vm.selectedEmployee._id,
					vm.tests[vm.selectedTest]._id
				)
				.success(function() {
					$('#confirm-delete').modal('toggle');
					vm.tests.splice(vm.selectedTest, 1);
					vm.selectedEmployee = -1;
					vm.selectedTest = -1;
				})
				.error(function(err) {
					vm.error = error.message;
				})
			}
		}
		function manageTest() {
			var data = {
				name	: $('#inputTest').val(),
				result	: $('#testResult').val(),
				comment	: $('#inputComment').val(),
			}
			//Add new test
			if (vm.selectedTest > -1) {
				if (vm.companyDetails._id && vm.selectedEmployee._id) {
					TestApi.updateTest(
						vm.companyDetails._id,
						vm.selectedEmployee._id,
						vm.tests[vm.selectedTest]._id,
						data
					).then(fnSuccess, fnError);
				}
			}
			// Update test
			else {
				if (vm.companyDetails._id && vm.selectedEmployee._id) {
					TestApi.addNewTest(
						vm.companyDetails._id,
						vm.selectedEmployee._id,
						data
					).then(fnSuccess, fnError);
				}
			}
		}
		// Promises
		function fnSuccess() {
			$('#frmTest').modal('toggle');
			$state.go('app.company');
		}
		function fnError(err) {
			vm.error = err.data.message;
		}
	}
})();