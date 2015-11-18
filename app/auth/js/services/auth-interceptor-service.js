(function() {
	'use strict';

	angular
		.module('resume.auth')
		.factory('AuthInterceptorService', AuthInterceptorService);

	AuthInterceptorService.$inject = ['$q', '$location', 'AuthService', 'CurrentUserService'];

	function AuthInterceptorService($q, $location, AuthService, CurrentUserService) {

		var token;

		////////////PUBLIC API////////////

		var AuthInterceptorService = {
			request: request,
			responseError: responseError
		};

		return AuthInterceptorService;

		///////////PUBLIC METHODS////////////

		function request(config) {
			config.headers = config.headers || {};
			token = AuthService.getToken();
			if (token) {
				config.headers.Authorization = 'Bearer ' + token;
				CurrentUserService.init(token); //pre-initialize current user 
			}
			return $q.when(config);
		};

		function responseError(rejection) {
			if (rejection.status === 403) {
				$location.path('login');
			}
			return $q.reject(rejection);
		};

	}

})();
