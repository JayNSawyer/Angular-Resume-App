'use strict'

angular.module('resume').controller('LoginCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope');
		var Auth = $injector.get('AuthService');
		var vm = this;

		vm.username = '';
		vm.password = '';
		vm.user = currentUser.profile;

		vm.login = function(form){
			if (form.$valid){
				Auth.verifyCredentials()
			}
		}
	}
]);