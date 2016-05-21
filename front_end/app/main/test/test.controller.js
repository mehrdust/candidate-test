(function () {
    'use strict';

    angular
    	.module('app.test')
    	.controller('TestController', TestController);

	TestController.$inject = [];
	function TestController() {
		var vm = this;
		vm.selectedTest = -1;
		vm.tests = [
			{
				employee: 'John',
				name: 'alcohol test',
				date: '21/04/2016',
				result: 'pass',
				comment: 'some comment for test 1'
			},
			{
				employee: 'John',
				name: 'alcohol test',
				date: '21/04/2016',
				result: 'pass',
				comment: 'some comment for test 2'
			},
			{
				employee: 'John',
				name: 'drug test',
				date: '21/03/2016',
				result: 'fail',
				comment: 'some comment for test 3'
			},
			{
				employee: 'John',
				name: 'drug test',
				date: '01/04/2016',
				result: 'pass',
				comment: 'some comment for test 4'
			},
			{
				employee: 'John',
				name: 'alcohol test',
				date: '26/04/2016',
				result: 'fail',
				comment: 'some comment for test 5'
			}
		];
		// methods
		vm.removeConfirmTest = removeConfirmTest;
		vm.addNewTest = addNewTest;
		vm.editTest = editTest;
		vm.removeTest = removeTest;

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
			$('#frmTest').modal();
		}
		function removeTest() {
			if (vm.selectedTest > -1) {
				vm.tests.splice(vm.selectedTest,1);
				vm.selectedTest = -1;
			}
			$('#confirm-delete').modal('toggle');
		}
	}
})();