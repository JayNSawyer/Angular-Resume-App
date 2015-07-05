'use strict';

angular.module('resume.auth')
	.factory('AuthService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$http = $injector.get('$http'),
				$window = $injector.get('$window'),
				DecodeTokenService = $injector.get('DecodeTokenService');

			var self = this;	

			var cachedToken;

			var saveToken = function(token){
				cachedToken = token;
				$window.localStorage['userToken'] = token;
			};

			var getToken = function(){
				if(!cachedToken){
					cachedToken = $window.localStorage['userToken'];
				}
				return cachedToken;
			};

			var removeToken = function(){
				$window.localStorage.clear();
			};

			var getPayload = function(){
				var token = getToken();
				var payload;

				if(!token){
					return false;
				} else {
					payload = DecodeTokenService.decodeToken(token);
					return payload;
				}	
			}

			var isAuthenticated = function(){
				var token = getToken();
				if(token){
					return true;
				} else {
					return false;
				}
			};

			var AuthService = {
				saveToken: saveToken,
				getToken: getToken,
				isAuthenticated: isAuthenticated,
				getPayload: getPayload,
				removeToken: removeToken
			};

			return AuthService;
		}

	]);