'use strict'

angular.module('resume.shared').controller('AlertCtrl', [
	'$scope',
	'$injector',
	function ($scope, $injector){
		var $rootScope = $injector.get('$rootScope'),
			$timeout = $injector.get('$timeout'),
			AlertService = $injector.get('AlertService');

		var vm = this;	

		vm.initAlert = function(events, element){
			AlertService.fetchAlerts().then(function(alertCollection){
			$scope.alertCollection = alertCollection.data;

			for(var i = 0; i < $scope.alertCollection.length; i++){
				if(events === $scope.alertCollection[i].event){
					$scope.$onRootScope($scope.alertCollection[i].event, function(event, msg){
						$timeout(function(){
							element.css('zIndex', 2147483647);

							$scope.myAlert = msg.alert;

							$scope.myAlert.close = 'X';

							var span = element.find('span');
							span.on('click', function(){
								$scope.myAlert.status.show = null;
								$timeout(function(){
									$scope.myAlert.status.show = null;
									$scope.myAlert.title = '';
									$scope.myAlert.message = '';
									$scope.myAlert.close = '';
									element.css('zIndex', 1);
									return;
								}, 10)
							});
						}, 10);
						$timeout(function(){
							$scope.myAlert.status.show = null;
							$scope.myAlert.title = '';
							$scope.myAlert.message = '';
							$scope.myAlert.close = '';
							element.css('zIndex', 1);


							// if(scope.myAlert.status.show === null){
							// 	console.log('i am null');
							 	// var myBtn = element.find('button');
							 	// myBtn.css('display', 'none');
							// }
						}, 5000);
					});
				}
			}

			});
		};
	}
]);