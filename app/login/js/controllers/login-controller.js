'use strict'

angular.module('resume').controller('LoginCtrl', [
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

	//	AlertService.addEvent('you-clicked-me', 'You clicked me!!');

		vm.clickMe = function(){
			console.log('you clicked me!');

			AlertService.emitAlert({type: 'success', event: 'click-me'}).then(function(alert){
				console.log(alert.type);
				$rootScope.$emit('click-me', {
					payload: null,
					alert: alert
				});
			});
		};



		vm.submit = function(){
			LoginService.login(vm.user).then(function(response){
				console.log(response);
				AuthService.saveToken(response.data.token);

				//broadcast this login event: 1. specify the payload; 2. specify the alert to display
				var payload = AuthService.getPayload();
				AlertService.emitAlert({type: 'success', event: 'user-logged-in'}).then(function(alert){

					//var loginAlert = alert;
					//broadcast the event
					$rootScope.$emit('user-logged-in', {
						payload: payload,
						alert: alert
					});
				});
			}, function(response){
				console.log(response.data);
			}).then(function(response){
		//		$timeout(function(){
					$state.go('main');
		//		}, 2000);
			});
		};
	}
]);