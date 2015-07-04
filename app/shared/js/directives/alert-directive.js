'use strict';

angular.module('resume.shared', [])
	.directive('alert', ['$rootScope', '$timeout', 'AlertService', function($rootScope, $timeout, AlertService){
		return {
			scope: {
				'event': '='
			},
			restrict: 'E',
			controller: 'AlertCtrl',
			replace: true,
			transclude: true,
			templateUrl: '/shared/views/alert-content.html',
			link: function(scope, element, attributes, ctrl){
				var events = attributes.event;
				var element = element;

				ctrl.initAlert(events, element);
			} 
		};
	}])
