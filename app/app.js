'use strict';

angular.module('resume', ['ngResource', 'ngRoute'])
	.controller('AppCtrl', [
		'$scope',
		'$injector',
		function ($scope, $injector){
			var $rootScope = $injector.get('$rootScope'),
				$http = $injector.get('$http'),
				UserService = $injector.get('UserService');

			var self = this;	

			$scope.greeting = 'Welcome to the Resume App!';

			UserService.getUsers().then(function(data){
				$scope.users = data;
			});
		}
	]);