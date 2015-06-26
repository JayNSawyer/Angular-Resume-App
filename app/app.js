'use strict';

angular.module('resume', ['ngResource', 'ngRoute', 'ui.router'])
	.controller('AppCtrl', [
		'$scope',
		'$injector',
		function ($scope, $injector){
			var $rootScope = $injector.get('$rootScope'),
				$http = $injector.get('$http'),
				CurrentUserService = $injector.get('CurrentUserService'),
				UserService = $injector.get('UserService');

			var vm = this;	

			$scope.greeting = 'Welcome to the Resume App!';

			// UserService.getUsers().then(function(data){
			// 	$scope.users = data;
			// });
		}
	]).config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: '/login/views/index.html',
				controller: 'LoginCtrl',
				onEnter: ['$location', 'AuthService', function($location, AuthService){
					if (AuthService.isAuthenticated()){
						$location.path('main');
					}
				}]
			})
			.state('register', {
				url: '/register',
				templateUrl: '/register/views/index.html',
				controller: 'RegisterCtrl',
				onEnter: ['$state', 'AuthService', function($location, AuthService){
					if (AuthService.isAuthenticated()){
						$location.path('main');
					}
				}]
			})
			.state('main', {
				url: '/main',
				templateUrl: '/main/views/index.html',
				controller: 'MainCtrl',
				onEnter: ['$location', 'AuthService', function($location, AuthService){
					if (AuthService.isAuthenticated()){
						var payload = AuthService.getPayload();
					//	console.log(payload);
					}
				}]
			});

		$urlRouterProvider.otherwise('main');	
	}
	]);