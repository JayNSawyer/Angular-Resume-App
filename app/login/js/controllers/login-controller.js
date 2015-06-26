'use strict'

angular.module('resume').controller('LoginCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope');
		var $state = $injector.get('$state');
		var AuthService = $injector.get('AuthService');
		var LoginService = $injector.get('LoginService');

		var vm = this;

		vm.user = {};

		vm.submit = function(){
			LoginService.login(vm.user).then(function(response){
				console.log(response);
				var data = response.data;
				var token = data.token;
				AuthService.saveToken(token);
				var payload = AuthService.getPayload();
				//broadcast the event
				$rootScope.$broadcast('user-logged-in', {
					payload: payload
				});
			}, function(response){
				console.log(response.data);
			}).then(function(response){
				$state.go('main');
			});
		};
	}
]);