'use strict'

angular.module('resume.logout').controller('LogoutCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope');
		var $state = $injector.get('$state');
		var AuthService = $injector.get('AuthService');
		var LogoutService = $injector.get('LogoutService');
		var vm = this;

		vm.logout = function(){
			LogoutService.logout();
		};
	}
]);