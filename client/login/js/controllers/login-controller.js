(function () {
    'use strict';

    angular
        .module('resume.login')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$state', 'AuthService', 'LoginService', 'AlertService', 'NotifierService'];

    function LoginCtrl($scope, $rootScope, $state, AuthService, LoginService, AlertService, NotifierService) {

        var vm = this;
        vm.user = {};
		vm.gibberish = 'trash';
        vm.forgotPassword = false;
        vm.submit = submit;
        vm.forgotPasswordSubmit = forgotPasswordSubmit;
        $rootScope.message = 'Enter Your Info Below To Log In!';


        function submit() {
            return LoginService.login(vm.user)
                .then(function (token) {
                    console.log(token);
                    AuthService.saveToken(token);
                    //	AlertService.emitAlert('user-logged-in');
                    $rootScope.$emit('user-logged-in', {
                        alert: 'none'
                    });
                    NotifierService.addNotifier('success', 'user logged in!');
                    $state.go('main');
					return token;
			//		$rootScope.$apply();
                })
                .catch(function (errorMessage) {
                    console.log('the failure: ');
                    console.log(errorMessage);
                    //	AlertService.emitAlert('user-login-failure');
                    NotifierService.addNotifier('danger', errorMessage);
                    $state.go('login.signIn');
				//	$rootScope.$apply();

                })
        }

        function forgotPasswordSubmit() {
            console.log(vm.user);
        }

    }
})();