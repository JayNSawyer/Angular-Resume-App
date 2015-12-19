(function(){
	'use strict';

	angular
		.module('resume.login')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['$scope', '$rootScope', '$state', 'AuthService', 'LoginService', 'AlertService', 'NotifierService'];	

	function LoginCtrl($scope, $rootScope, $state, AuthService, LoginService, AlertService, NotifierService){

		var vm = this;

		vm.user = {};
		vm.forgotPassword = false;
		vm.submit = submit;
		vm.forgotPasswordSubmit = forgotPasswordSubmit;
		$rootScope.message = 'Enter Your Info Below To Log In!';


		function submit() {

			LoginService.login(vm.user)
				.then(function(response){
					console.log(response);
					AuthService.saveToken(response.data.token);
				//	AlertService.emitAlert('user-logged-in');
					$rootScope.$emit('user-logged-in', {
						alert: 'none'
					});
					NotifierService.addNotifier('success', 'user logged in!');
					$state.go('main');
				})
				.catch(function(e){
					console.log('the failure: ');
					console.log(e.data.message);
				//	AlertService.emitAlert('user-login-failure');
					NotifierService.addNotifier('danger', e.data.message);
					$state.go('login.signIn');
				})
		}

		function forgotPasswordSubmit() {
			console.log(vm.user);
		}

	}
})();
