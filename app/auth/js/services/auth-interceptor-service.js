(function() {
	'use strict';

	angular
		.module('resume.auth')
		.factory('AuthInterceptorService', AuthInterceptorService);

	AuthInterceptorService.$inject = ['$q', '$location', 'AuthService', 'CurrentUserService'];

	function AuthInterceptorService($q, $location, AuthService, CurrentUserService) {

		var token;

		var request = function(config) {
			config.headers = config.headers || {};
			token = AuthService.getToken();
			if (token) {
				config.headers.Authorization = 'Bearer ' + token;
				CurrentUserService.init(token);
			}
			return $q.when(config);
		};

		var responseError = function(rejection) {
			if (rejection.status === 403) {
				$location.path('login');
			}
			return $q.reject(rejection);
		};

		return {
			request: request,
			responseError: responseError
		};

	}

})();
