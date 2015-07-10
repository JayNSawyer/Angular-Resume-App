'use strict';

angular.module('resume.auth')
	.factory('RequestTokenService', [
		'$injector',
		function ($injector){
			var	$q = $injector.get('$q'),
				AuthService = $injector.get('AuthService'),
				CurrentUserService = $injector.get('CurrentUserService');

			var self = this;
			var currentUser;
			var token;
			var status;

			var	request = function(config){
				token = AuthService.getToken();
				if(token){
					CurrentUserService.init().then(function(){
						config.headers.Authorization = 'Bearer ' + token;
					});
				}
				return $q.when(config);
			}	

			return {
				request: request
			}
		}

	]).config([
	'$httpProvider',
	function ($httpProvider) {
		$httpProvider.interceptors.push('RequestTokenService');
	}
	]);	;