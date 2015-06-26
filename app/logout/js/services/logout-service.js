'use strict';

angular.module('resume')
	.factory('LogoutService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$window = $injector.get('$window'),
				$q = $injector.get('$q'),
				$http = $injector.get('$http'),
				AuthService = $injector.get('AuthService');


			var self = this;
			var logout = function(){
				var deferred = $q.defer();
				deferred.resolve( AuthService.removeToken() );
				return deferred.promise;
			};

			var LogoutService = {
				logout: logout
			};

			return LogoutService;
		}

	]);