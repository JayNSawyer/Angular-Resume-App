'use strict';

angular.module('resume')
	.factory('AuthService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$q = $injector.get('$q'),
				$http = $injector.get('$http'),
				$window = $injector.get('$window'),
				DecodeTokenService = $injector.get('DecodeTokenService');
				ValidationService = $injector.get('ValidationService');

			var self = this;	
			var validationObject;

			var mockCredentials = {
				username: 'TimRobbins81',
				password: 'timmy81'
			};

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

			var isAuthenticated = function(){
				var token = getToken();
				return token;
			};


			var AuthService = {
				saveToken: saveToken,
				getToken: getToken,
				isAuthenticated: isAuthenticated
				// verifyCredentials: function(username, password){
				// 	if (username && password){
				// 		if (username === mockCredentials.username && password === mockCredentials.password){
				// 			validationObject = ValidationService.setValidationObject('verified');
				// 			return validationObject;
				// 		} else if (username === mockCredentials.username && password !== mockCredentials.password){
				// 			validationObject = ValidationService.setValidationObject('password');
				// 			return validationObject;
				// 		} else if (username !== mockCredentials.username && password === mockCredentials.password){
				// 			validationObject = ValidationService.setValidationObject('username');
				// 			return validationObject;
				// 		} else {
				// 			validationObject = ValidationService.setValidationObject('error');
				// 			return validationObject;
				// 		}
				// 	}
				// }
			}
			return AuthService;
		}

	]);