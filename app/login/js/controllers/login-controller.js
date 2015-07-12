'use strict'

angular.module('resume.login').controller('LoginCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope');
		var $state = $injector.get('$state');
		var AuthService = $injector.get('AuthService');
		var LoginService = $injector.get('LoginService');
		var AlertService = $injector.get('AlertService');
		var $timeout = $injector.get('$timeout');

		var vm = this;

		vm.user = {};

		/* end test */

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

	}
]);