(function(){
	'use strict';

	angular
		.module('resume.login')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['$scope', '$rootScope', '$state', 'AuthService', 'LoginService', 'AlertService'];	

	function LoginCtrl($scope, $rootScope, $state, AuthService, LoginService, AlertService){

		var vm = this;

		vm.user = {};

		vm.forgotPassword = false;

		$rootScope.message = 'Enter Your Info Below To Log In!';

		vm.submit = function(){
			LoginService.login(vm.user).then(function(response){
				console.log(response);
				AuthService.saveToken(response.data.token);
				AlertService.emitAlert('user-logged-in');
				$state.go('main');
			}, function(response){
				console.log('the failure: ');
				console.log(response.data.message);
				AlertService.emitAlert('user-login-failure');
			});
		};

		vm.forgotPasswordSubmit = function(){
			console.log(vm.user);
		};
	}
})();
