(function () {
    'use strict';

    angular
    	.module('app.company')
    	.controller('CompanyController', CompanyController);

	CompanyController.$inject = ['CompanyApi'];
	function CompanyController(CompanyApi) {
		var vm = this;
		vm.selectedCompany = -1;
		vm.removeConfirmCompany = removeConfirmCompany;
		vm.editCompany = editCompany;
		vm.removeCompany = removeCompany;
		vm.manageCompany = manageCompany;
		vm.modalAddNewCompany = modalAddNewCompany;
		vm.deleteCompany = vm.deleteCompany;
		vm.companies = [];

		// INITIALIZE THE CONTROLLER
		getCompanies();

		function modalAddNewCompany() {
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
		function getCompanies() {
			CompanyApi.getAllCompanies().then(function(data, status) {
				var company = {};
				vm.companies = [];
				angular.forEach(data.data, function(value, key) {
					company.id = value._id;
					company.name = value.name;
					company.description = value.description ? value.description : '';
					company.employees = value.employees;
					vm.companies.push(value);
					company = {};
				});
			})
		}
		function manageCompany() {
			// Update Company
			if (vm.selectedCompany > -1) {

			}
			// Add new company
			else {
				CompanyApi.addNewCompany({
					name: $('#inputName').val(),
					description: $('#inputDescription').val()
				}).then(function(){
					$('#frmCompany').modal('toggle');
					getCompanies();
				});
			}
		}
		function deleteCompany() {
			console.log("updateCompany");
		}
	}
})();