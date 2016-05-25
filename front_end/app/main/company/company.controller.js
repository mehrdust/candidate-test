(function () {
    'use strict';

    angular
    	.module('app.company')
    	.controller('CompanyController', CompanyController);

	CompanyController.$inject = ['$rootScope', 'CompanyApi', 'CompanyDetails', '$state'];
	function CompanyController($rootScope, CompanyApi, CompanyDetails, $state) {
		var vm = this;
		vm.selectedCompany = -1;
		vm.removeConfirmCompany = removeConfirmCompany;
		vm.editCompany = editCompany;
		vm.removeCompany = removeCompany;
		vm.manageCompany = manageCompany;
		vm.modalAddNewCompany = modalAddNewCompany;
		vm.getEmployees = getEmployees;
		vm.companies = [];
		vm.error = null;

		// INITIALIZE THE CONTROLLER
		$rootScope.$broadcast('state-changed', { state: $state.current.name});
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
				CompanyApi.updateCompany(vm.companies[vm.selectedCompany]._id, {
					name		: vm.companies[vm.selectedCompany].name,
					description : vm.companies[vm.selectedCompany].description
				}).then(fnSuccess, fnError);
			}
			// Add new company
			else {
				CompanyApi.addNewCompany({
					name: $('#inputName').val(),
					description: $('#inputDescription').val()
				}).then(fnSuccess, fnError);
			}
		}
		function removeCompany() {
			if (vm.selectedCompany > -1) {
				CompanyApi.deleteCompany(vm.companies[vm.selectedCompany]._id)
					.success(function() {
						$('#confirm-delete').modal('toggle');
						vm.selectedCompany = -1;
						vm.error = null;
						getCompanies();
					})
					.error(function(err) {
						vm.error = err.message;
					}
				);
			}
		}
		function getEmployees(id) {
			CompanyApi.getOneCompany(id)
				.success(function(data) {
					CompanyDetails.setCompanyDetails(data);
					$state.go('app.employee');
				})
				.error(function(data) {
					alert(data);
				}
			);
		}
		// Promises
		function fnSuccess(data) {
			$('#frmCompany').modal('toggle');
			getCompanies();
			vm.error = null;
		}
		function fnError(data) {
			vm.error = data.data.message;
		};
	}
})();