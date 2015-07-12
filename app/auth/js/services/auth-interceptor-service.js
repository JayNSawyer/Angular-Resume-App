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
				token = AuthService.getToken();
				if(token){
					CurrentUserService.init().then(function(){
						config.headers.Authorization = 'Bearer ' + token;
					});
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