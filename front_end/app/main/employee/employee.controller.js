(function () {
    'use strict';

    angular
    	.module('app.employee')
    	.controller('EmployeeController', EmployeeController);

	// @ngInject
	EmployeeController.$inject = ['DialogBox'];
	function EmployeeController(DialogBox) {
		var vm = this;
		vm.selectedEmployee = -1;
		vm.addNewEmployee = addNewEmployee;
		vm.removeEmployee = removeEmployee;
		vm.removeConfirmEmployee = removeConfirmEmployee;
		vm.editEmployee = editEmployee;
		vm.employees = [
			{
				name: 'John',
				email: 'john@mail.ca',
				phone: '656334343'
			},
			{
				name: 'Simon',
				email: 'simpm@name.ca',
				phone: '4324343432'
			},
			{
				name: 'Tylor',
				email: 'tylor@name.ca',
				phone: '43254364436'
			}
		]
		function addNewEmployee() {
			vm.selectedEmployee = -1;
			$('#frmEmployee').modal();
		}
		function removeConfirmEmployee(index) {
			vm.selectedEmployee = index;
			$('#confirm-delete').modal();
			// vm.employees.splice(index, 1);
		}
		function removeEmployee() {
			if (vm.selectedEmployee > -1) {
				vm.employees.splice(vm.selectedEmployee, 1);
				vm.selectedEmployee = -1;
			}
			$('#confirm-delete').modal('toggle');
		}
		function editEmployee(index) {
			vm.selectedEmployee = index;
			$('#frmEmployee').modal();
		}

	}
})();