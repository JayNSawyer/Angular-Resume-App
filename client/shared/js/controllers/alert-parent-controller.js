'use strict'

angular.module('resume.shared').controller('AlertParentCtrl', [
	'$scope',
	'$injector',
	function ($scope, $injector){
		var $rootScope = $injector.get('$rootScope'),
			$timeout = $injector.get('$timeout'),
			AlertService = $injector.get('AlertService');

		var vm = this;	

		vm.event = '';

		vm.initAlert = function(){
		AlertService.fetchAlerts().then(function(alertCollection){
			$scope.alertCollection = alertCollection.data;

			for(var i = 0; i < $scope.alertCollection.length; i++){
				$scope.$onRootScope($scope.alertCollection[i].event, function(event, msg){
					vm.event = msg.alert.event;
				});
			}
			});
		};

		vm.initAlert();
	}
]);