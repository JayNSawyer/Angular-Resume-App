'use strict'

angular.module('resume.register').controller('RegisterCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope');
		var $state = $injector.get('$state');
		var AuthService = $injector.get('AuthService');
		var RegisterService = $injector.get('RegisterService');
		var AlertService = $injector.get('AlertService');

		var vm = this;

		vm.user = {};

		vm.submit = function(){
			RegisterService.register(vm.user).then(function(response){
				console.log(response);
				AuthService.saveToken(response.data.token);
				AlertService.emitAlert('user-registration-success');
				$state.go('main');
			}, function(error){
				AlertService.emitAlert('user-registration-failure');
			});
		};


	}
]);