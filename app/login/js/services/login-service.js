'use strict';

angular.module('resume.login')
	.factory('LoginService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$http = $injector.get('$http');


			var self = this;
			var login = function(user){
				return $http.post('/login', user);
			};

			var LoginService = {
				login: login
			};

			return LoginService;
		}

	]);



