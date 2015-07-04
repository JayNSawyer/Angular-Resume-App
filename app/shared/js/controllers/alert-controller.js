'use strict'

angular.module('resume.shared').controller('AlertCtrl', [
	'$scope',
	'$injector',
	function ($scope, $injector){
		var $rootScope = $injector.get('$rootScope'),
			$timeout = $injector.get('$timeout'),
			AlertService = $injector.get('AlertService');

		var vm = this;	

		vm.element = '';
		vm.event = '';

		$scope.closeAlert = function(){
			$scope.myAlert.status.show = null;
			$timeout(function(){
				$scope.myAlert.status.show = null;
				$scope.myAlert.title = '';
				$scope.myAlert.message = '';
				$scope.myAlert.close = '';
				vm.element.css('zIndex', 1);
				return;
			}, 10)
		};

		vm.getElementAndAttribute = function(event, element){
			vm.element = element;
			vm.event = event;
		};

		vm.initAlert = function(){
			AlertService.fetchAlerts().then(function(alertCollection){
			$scope.alertCollection = alertCollection.data;

			for(var i = 0; i < $scope.alertCollection.length; i++){
				if(vm.event === $scope.alertCollection[i].event){
					$scope.$onRootScope($scope.alertCollection[i].event, function(event, msg){
						$timeout(function(){
							vm.element.css('zIndex', 2147483647);

							$scope.myAlert = msg.alert;
							$scope.myAlert.close = 'X';

						}, 10);
						$timeout(function(){
							$scope.closeAlert();
	
						}, 5000);
					});
				}
			}

			});
		};
	}
]);