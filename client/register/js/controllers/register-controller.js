(function () {
    'use strict';

    angular
        .module('resume.register')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$rootScope', '$state', 'AuthService', 'RegisterService', 'AlertService'];

    function RegisterCtrl($rootScope, $state, AuthService, RegisterService, AlertService) {
        var vm = this;

        vm.user = {};

        vm.submit = function () {
            RegisterService.register(vm.user).then(function (response) {
                console.log(response);
                AuthService.saveToken(response.data.token);
                AlertService.emitAlert('user-registration-success');
                $state.go('main');
            }, function (error) {
				console.log(error);
                AlertService.emitAlert('user-registration-failure');
            });
        };
    }

})();
