'use strict';

angular.module('resume', [
	//Angular  modules
	'ngResource', 
	'ngRoute', 

	//Custom modules
	'resume.auth',
	'resume.login',
	'resume.logout',
	'resume.main',
	'resume.navigation',
	'resume.register',
	'resume.shared',
	'resume.user',

	//Vendor modules
	'ui.router'
	])
	.controller('AppCtrl', [
		'$scope',
		'$injector',
		function ($scope, $injector){
			var $rootScope = $injector.get('$rootScope'),
				$http = $injector.get('$http'),
				CurrentUserService = $injector.get('CurrentUserService'),
				$timeout = $injector.get('$timeout'),
				AlertService = $injector.get('AlertService'),
				UserService = $injector.get('UserService');

			var vm = this;	

			$scope.greeting = 'Welcome to the Resume App!';

			$scope.closeAlert = function(){
				console.log('You called me!');
			};
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
				onEnter: ['$location', 'AuthService', function($location, AuthService){
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
					}
				}]
			});

		$urlRouterProvider.otherwise('main');	
	}
	]).config(['$provide', function($provide){		
		$provide.decorator('$rootScope', ['$delegate', function($delegate){

		    Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
		        value: function(name, listener){
		            var unsubscribe = $delegate.$on(name, listener);
		            this.$on('$destroy', unsubscribe);

		            return unsubscribe;
		        },
		        enumerable: false
		    });

		    return $delegate;
		}]);
	}]);