(function () {

    angular
        .module('app.auth')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$state', 'authentication'];
    function RegisterController($state, authentication) {
        var vm = this;

        vm.error = null;
        vm.credentials = {
            name : "",
            email : "",
            password : ""
        };

        vm.onSubmit = function () {
            console.log('Submitting registration');
            authentication
                .register(vm.credentials)
                .error(function(err){
                    vm.error = err.message;
                })
                .then(function(){
                    vm.error = null;
                    $state.go('app');
                }
            );
        };
    }
})();
