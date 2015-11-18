(function() {

	'use strict';

	angular.module('resume').config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: '/login/views/index.html',
					controller: 'LoginCtrl',
					onEnter: ['$location', 'AuthService', function($location, AuthService) {
						if (AuthService.isAuthenticated()) {
							$location.path('main');
						}
						$location.path('/login/signin');
					}]
				})
				.state('login.signIn', {
					url: '/signin',
					templateUrl: '/login/views/signin.html',
					onEnter: ['$location', 'AuthService', function($location, AuthService) {
						if (AuthService.isAuthenticated()) {
							$location.path('main');
						}
					}]
				})
				.state('login.forgotPassword', {
					url: '/password/new',
					templateUrl: '/login/views/forgot-password.html',
					controller: 'ForgotPasswordCtrl'
				})
				.state('writers', {
					url: '/writers',
					templateUrl: '/writers/views/index.html',
					controller: 'WritersCtrl',
					controllerAs: 'writersCtrl'
				})
				.state('register', {
					url: '/register',
					templateUrl: '/register/views/index.html',
					controller: 'RegisterCtrl',
					onEnter: ['$location', 'AuthService', function($location, AuthService) {
						if (AuthService.isAuthenticated()) {
							$location.path('main');
						}
					}]
				})
				.state('main', {
					url: '/main',
					templateUrl: '/main/views/index.html',
					controller: 'MainCtrl',
					controllerAs: 'mainCtrl',
					onEnter: ['$location', 'AuthService', function($location, AuthService) {
						if (AuthService.isAuthenticated()) {
							var payload = AuthService.getPayload();
						}
					}]
				});

			$urlRouterProvider.otherwise('main');
		}
	]).config(['$provide', function($provide) {
		$provide.decorator('$rootScope', ['$delegate', function($delegate) {

			Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
				value: function(name, listener) {
					var unsubscribe = $delegate.$on(name, listener);
					this.$on('$destroy', unsubscribe);

					return unsubscribe;
				},
				enumerable: false
			});

			return $delegate;
		}]);
	}]);

})();
