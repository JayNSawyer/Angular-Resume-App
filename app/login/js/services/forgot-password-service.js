'use strict';

angular.module('resume.login')
	.factory('ForgotPasswordService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$http = $injector.get('$http');


			var self = this;
			var resetPassword = function(user){
				return $http.post('/reset-password', user);
			};

			var ForgotPasswordService = {
				resetPassword: resetPassword
			};

			return ForgotPasswordService;
		}

	]);



