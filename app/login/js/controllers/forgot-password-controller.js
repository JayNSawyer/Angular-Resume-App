'use strict'

angular.module('resume.login').controller('ForgotPasswordCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope');
		var $state = $injector.get('$state');
		var $q = $injector.get('$q');
		var $controller = $injector.get('$controller');
		var AuthService = $injector.get('AuthService');
		var ForgotPasswordService = $injector.get('ForgotPasswordService');

		var vm = this;


		vm.email = '';

		//vm.user = {};


		vm.resetPassword = function(){
		//	var user = user;
			ForgotPasswordService.resetPassword(vm.user).then(function(response){
				if (response.data.username){
					//user was found, redirect to change password 
					console.log('Password changed!');
				}
			//	console.log(response);
			});
			// LoginService.login(vm.user).then(function(response){
			// 	console.log(response);
			// 	AuthService.saveToken(response.data.token);
			// 	AlertService.emitAlert('user-logged-in');
			// 	$state.go('main');
			// }, function(response){
			// 	console.log('the failure: ');
			// 	console.log(response.data.message);
			// 	AlertService.emitAlert('user-login-failure');
			// });
		};

	}
]);