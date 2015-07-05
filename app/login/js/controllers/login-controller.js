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
		var CurrentUserService = $injector.get('CurrentUserService');
		var $timeout = $injector.get('$timeout');

		var vm = this;

		vm.user = {};

		/* click me test */
		vm.clickMe = function(){
			AlertService.emitAlert('click-me');
		};
		/* end test */

		vm.submit = function(){
			LoginService.login(vm.user).then(function(response){
				AuthService.saveToken(response.data.token);
				CurrentUserService.init().then(function(){
					AlertService.emitAlert('user-logged-in');
				});
			}, function(response){
				console.log(response.data);
			}).then(function(response){
				$state.go('main');
			});
		};

	}
]);