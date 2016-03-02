'use strict';

angular.module('resume.shared', [])
	.directive('alert', ['$rootScope', '$timeout', 'AlertService', function($rootScope, $timeout, AlertService){
		return {
			scope: {
				'event': '='
			},
			restrict: 'E',
			controller: 'AlertCtrl',
			controllerAs: 'alertCtrl',
			bindToController: true,
			replace: true,
			templateUrl: '/shared/views/alert-content.html',
			link: function(scope, element, attributes, ctrl){
				ctrl.getElement(element);
				ctrl.initAlert();
			} 
		};
	}])
