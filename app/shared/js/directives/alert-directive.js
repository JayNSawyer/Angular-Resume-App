'use strict';

angular.module('resume.shared', [])
	.directive('alert', ['$rootScope', '$timeout', 'AlertService', function($rootScope, $timeout, AlertService){
		return {
			scope: {
				'event': '='
			},
			restrict: 'E',
			replace: true,
			templateUrl: '/shared/views/alert-content.html',
			link: function(scope, element, attributes){
				var bootStrapData = function(){
					AlertService.fetchAlerts().then(function(alertCollection){
						scope.alertCollection = alertCollection.data;

						for(var i = 0; i < scope.alertCollection.length; i++){
							if(attributes.event === scope.alertCollection[i].event){
								scope.$onRootScope(scope.alertCollection[i].event, function(event, msg){
									$timeout(function(){
										element.css('zIndex', 2147483647);
										scope.myAlert = msg.alert;
									}, 500);
									$timeout(function(){
										scope.myAlert.status.show = null;
										element.css('zIndex', 1);
									}, 3000);
								});
							}
						}

					});
				};
				bootStrapData();
			} 
		};
	}])
