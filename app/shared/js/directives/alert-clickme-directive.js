'use strict';

angular.module('resume')
	.directive('alertClickMe', ['$rootScope', '$timeout', 'AlertService', function($rootScope, $timeout, AlertService){
		return {
			scope: {
				'clickme': '='
			},
			restrict: 'E',
			replace: true,
		//	controller: 'AlertCtrl',
		//	controllerAs: 'alertCtrl',
			templateUrl: '/shared/views/alert-clickme-content.html',
			bindToController: true,
			link: function(scope, element, attributes){

				var bootStrapData = function(){
					AlertService.fetchAlerts().then(function(alertCollection){

						var typesObj = {
							clickme: ''
						};	

						scope.alertCollection = alertCollection.data;


						scope.$onRootScope('click-me', function(event, msg){
							if(typesObj.clickme === 'on'){
								$timeout(function(){
									scope.myAlert = msg.alert;
									scope.myAlert.remove = false;
								}, 500);
								$timeout(function(){
									//vm.myAlert.hide = true;
									scope.myAlert.type = null;
									scope.myAlert.status.show = false;
								}, 3000);
							}
						});


						attributes.$observe('clickme', function(value) {
							typesObj.clickme = value;
						});

						var showAlertType = function(typesObj){
							switch(typesObj.type){
								case 'success':
									element.children().css('background-color', 'green');
									break;
								case 'danger':
									element.children().css('background-color', 'red');	
									break;
								case 'warning':
									element.children().css('background-color', 'yellow');
									break;
								case 'info':
									element.children().css('background-color', 'blue');
									break;
								default:
									element.children().css('background-color', 'green');			
							}
						};

						scope.$onRootScope('click-me', function(event, msg){
							if(msg.alert.event === 'click-me' && attributes.clickme === 'on'){
								showAlertType(typesObj);
							} else {
								return false;
							}
						});

					});
				}

				bootStrapData();

			} 
			
		};
	}])
