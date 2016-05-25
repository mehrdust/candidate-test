(function () {
    'use strict';

    angular
    	.module('app.employee')
    	.controller('EmployeeController', EmployeeController);

	// @ngInject
	EmployeeController.$inject = ['$rootScope', '$http', '$state', 'CompanyDetails', 'EmployeeApi', 'authentication'];
	function EmployeeController($rootScope, $http, $state, CompanyDetails, EmployeeApi, authentication) {
		var vm = this;
		vm.selectedEmployee = -1;
		vm.modalAddNewEmployee = modalAddNewEmployee;
		vm.manageEmployees = manageEmployees;
		vm.removeEmployee = removeEmployee;
		vm.removeConfirmEmployee = removeConfirmEmployee;
		vm.getTests = getTests;
		vm.editEmployee = editEmployee;
		vm.companyDetails = {};
		vm.error = null;
		// Activate controller
		activate();

		function activate() {
			if (!authentication.isLoggedIn()) {
				$state.go('app.login');
			}
			CompanyDetails.getCompanyDetails()
				.then(function(data) {
					vm.companyDetails = data;
					vm.employees = data.employees;
				},
				function() {
					vm.companyDetails = {};
				}
			);
		}
		function modalAddNewEmployee() {
			vm.selectedEmployee = -1;
			$('#frmEmployee').modal();
		}
		function removeConfirmEmployee(index) {
			vm.selectedEmployee = index;
			$('#confirm-delete').modal();
			// vm.employees.splice(index, 1);
		}
		function editEmployee(index) {
			vm.selectedEmployee = index;
			$('#frmEmployee').modal();
		}
		function manageEmployees() {
			var data = {
				name : $('#inputName').val(),
				email: $('#inputEmail').val(),
				phone: $('#inputPhone').val()
			};
			// Update Employee
			if (vm.selectedEmployee > -1) {
				if (vm.companyDetails._id) {
					EmployeeApi.updateEmployee(
						vm.companyDetails._id,
						vm.employees[vm.selectedEmployee]._id,
					  	data
				  	).then(fnSuccess, fnError);
				}
			}
			// Add new Employee
			else {
				if (vm.companyDetails._id) {
					EmployeeApi.addNewEmployee(vm.companyDetails._id, data)
						.then(fnSuccess, fnError);
				}
			}
		}
		function removeEmployee() {
			if (vm.selectedEmployee > -1 && vm.companyDetails._id) {
				EmployeeApi.deleteEmployee(
					vm.companyDetails._id,
					vm.employees[vm.selectedEmployee]._id
				)
				.success(function() {
					$('#confirm-delete').modal('toggle');
					vm.employees.splice(vm.selectedEmployee,1);
				})
				.error(function(err) {
					vm.error = error.message;
				})
				vm.selectedEmployee = -1;
			}
		}
		function getTests(empId) {
			EmployeeApi.getOneEmployee(vm.companyDetails._id, empId)
				.success(function(data) {
					CompanyDetails.setSelectedEmployee(data);
					$state.go('app.test');
				})
				.error(function(data) {
					alert(data);
				}
			);
		}
		// Promises
		function fnSuccess() {
			$('#frmEmployee').modal('toggle');
			$state.go('app.company');
		}
		function fnError(err) {
			vm.error = err.data.message;
		}
	}
})();