'use strict';

angular.module('resume', ['ngResource', 'ngRoute', 'ui.router'])
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
	]).config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: '/login/views/index.html',
				controller: 'LoginCtrl'
			})
			.state('register', {
				url: '/register',
				templateUrl: '/register/views/index.html',
				controller: 'RegisterCtrl'
			})
			.state('main', {
				url: '/main',
				templateUrl: '/main/views/index.html',
				controller: 'MainCtrl'
			});

		$urlRouterProvider.otherwise('main');	
	}
	]);