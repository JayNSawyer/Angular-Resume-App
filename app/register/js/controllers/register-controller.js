'use strict'

angular.module('resume').controller('RegisterCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope');
		var $state = $injector.get('$state');
		var AuthService = $injector.get('AuthService');
		var RegisterService = $injector.get('RegisterService');
		var vm = this;

		vm.user = {};

		vm.submit = function(){
			RegisterService.register(vm.user).then(function(response){
				console.log(response);
				var data = response.data;
				var token = data.token;
				AuthService.saveToken(token);
			}, function(response){
				console.log(response.data);
			}).then(function(response){
				$state.go('main');
			});
		};
	}
]);