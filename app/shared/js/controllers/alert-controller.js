'use strict'

angular.module('resume.shared').controller('AlertCtrl', [
	'$scope',
	'$injector',
	function ($scope, $injector){
		var $rootScope = $injector.get('$rootScope'),
			$timeout = $injector.get('$timeout'),
			AlertService = $injector.get('AlertService');

		var vm = this;	
		var timerOpen;
		var timerDefaultClose; //the default timer to close the alert
		var timerClose; //the timer for closing the alert early

		vm.element = '';

	//	vm.close = true;
		vm.close = true;

		$scope.closeAlert = function(){
			$scope.myAlert.status.show = null;
			if(vm.close === false){
				vm.close = true;
			}
			if(timerDefaultClose){ 
				$timeout.cancel(timerDefaultClose);
			}
			timerClose = $timeout(function(){
				$scope.myAlert.status.show = null;
				$scope.myAlert.title = '';
				$scope.myAlert.message = '';
				$scope.myAlert.close = '';
				vm.element.css('zIndex', 1);
				vm.event = undefined;
				return;
			}, 10);
			timerClose.then(function(){
				console.log('timer has resolved');
			});
		};

		vm.getElement = function(element){
			vm.element = element;
		};

		vm.initAlert = function(){
			$scope.$watch('alertCtrl.event', function(newEvent, oldEvent){
				if(newEvent !== oldEvent){
					if (vm.event){
						AlertService.getAlert(newEvent).then(function(alert){
							vm.close = false;
							timerOpen = $timeout(function(){
									vm.element.css('zIndex', 2147483647);
									$scope.myAlert = alert;
									$scope.myAlert.close = 'X';
							}, 10);
							timerDefaultClose = $timeout(function(){
									$scope.closeAlert(); //closeAlert() will resolve timerDefaultClose
							}, 5000);
						});
					}
				}
			});
		};
	}
]);