'use strict';

angular.module('resume')
	.factory('RegisterService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$http = $injector.get('$http');


			var self = this;
			var register = function(user){
				return $http.post('/register', user);
			};

			var RegisterService = {
				register: register
			};

			return RegisterService;
		}

	]);