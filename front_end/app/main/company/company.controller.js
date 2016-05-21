(function () {
    'use strict';

    angular
    	.module('app.company')
    	.controller('CompanyController', CompanyController);

	CompanyController.$inject = [];
	function CompanyController() {
		var vm = this;
		vm.selectedCompany = -1;
		vm.removeConfirmCompany = removeConfirmCompany;
		vm.editCompany = editCompany;
		vm.removeCompany = removeCompany;
		vm.addNewCompany = addNewCompany;
		vm.companies = [
			{
				name: 'Company 1',
				description: 'Description for company 1'
			},
			{
				name: 'Company 2',
				description: 'Description for company 2'
			},
			{
				name: 'Company 3',
				description: 'Description for company 3'
			},
			{
				name: 'Company 4',
				description: 'Description for company 4'
			},
			{
				name: 'Company 5',
				description: 'Description for company 5'
			},
			{
				name: 'Company 6',
				description: 'Description for company 6'
			}
		];
		function addNewCompany() {
			vm.selectedCompany = -1;
			$('#frmCompany').modal();
		}
		function removeConfirmCompany(index) {
			vm.selectedCompany = index;
			$('#confirm-delete').modal();
		}
		function editCompany(index) {
			vm.selectedCompany = index;
			$('#frmCompany').modal();

		}
		function removeCompany() {
			if (vm.selectedCompany > -1) {
				vm.companies.splice(vm.selectedCompany, 1);
				vm.selectedCompany = -1;
			}
			$('#confirm-delete').modal('toggle');
		}
	}
})();