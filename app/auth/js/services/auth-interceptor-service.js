'use strict';

angular.module('resume.auth')
	.factory('AuthInterceptorService', [
		'$injector',
		function ($injector){
			var	$q = $injector.get('$q'),
				$location = $injector.get('$location'),
				AuthService = $injector.get('AuthService'),
				CurrentUserService = $injector.get('CurrentUserService');

			var token;

			var	request = function(config){
				config.headers = config.headers || {};
				token = AuthService.getToken();
				if(token){
					config.headers.Authorization = 'Bearer ' + token;
					CurrentUserService.init();
				}
				return $q.when(config);
			};

			var responseError = function(rejection){
				if (rejection.status === 403){
					$location.path('login');
				}
				return $q.reject(rejection);
			};	

			return {
				request: request,
				responseError: responseError
			}
		}

	]);