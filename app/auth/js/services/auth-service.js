'use strict';

angular.module('resume')
	.factory('AuthService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$q = $injector.get('$q'),
				$http = $injector.get('$http'),
				ValidationService = $injector.get('ValidationService');

			var self = this;	
			var validationObject;

			var mockCredentials = {
				username: 'TimRobbins81',
				password: 'timmy81'
			};

			var AuthService = {
				verifyCredentials: function(username, password){
					if (username && password){
						if (username === mockCredentials.username && password === mockCredentials.password){
							validationObject = ValidationService.setValidationObject('verified');
							return validationObject;
						} else if (username === mockCredentials.username && password !== mockCredentials.password){
							validationObject = ValidationService.setValidationObject('password');
							return validationObject;
						} else if (username !== mockCredentials.username && password === mockCredentials.password){
							validationObject = ValidationService.setValidationObject('username');
							return validationObject;
						} else {
							validationObject = ValidationService.setValidationObject('error');
							return validationObject;
						}
					}
				}
			}
			return AuthService;
		}

	]);