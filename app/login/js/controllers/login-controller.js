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

		/* click me test */
		vm.clickMe = function(){
			AlertService.emitAlert({event: 'click-me'}).then(function(alert){
				console.log(alert.type);
				$rootScope.$emit('click-me', {
					payload: null,
					alert: alert
				});
			});
		};
		/* end test */

		vm.submit = function(){
			LoginService.login(vm.user).then(function(response){
				AuthService.saveToken(response.data.token);
				var payload = AuthService.getPayload();

				AlertService.emitAlert({event: 'user-logged-in'}).then(function(alert){

					$rootScope.$emit('user-logged-in', {
						payload: payload,
						alert: alert
					});
				});
			}, function(response){
				console.log(response.data);
			}).then(function(response){
				$state.go('main');
			});
		};
	}
]);