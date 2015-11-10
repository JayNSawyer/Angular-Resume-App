(function(){
	'use strict';

	angular
		.module('resume.logout')
		.controller('LogoutCtrl', LogoutCtrl);

	LogoutCtrl.$inject = ['$scope', '$rootScope', '$state', 'AuthService', 'LogoutService'];	

	function LogoutCtrl($scope, $rootScope, $state, AuthService, LogoutService){

		var vm = this;

		vm.logout = function(){
			LogoutService.logout();
		};
	}
})();
