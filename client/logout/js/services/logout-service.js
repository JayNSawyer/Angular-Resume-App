(function(){
	'use strict';

	angular
		.module('resume.logout')
		.factory('LogoutService', LogoutService);

	LogoutService.$inject = ['$rootScope', '$q', '$http', 'AuthService'];

	function LogoutService ($rootScope, $q, $http, AuthService) {

		var self = this;

		////////////PUBLIC API////////////

		var LogoutService = {
			logout: logout
		};

		return LogoutService;

		///////////PUBLIC METHODS////////////
		
		function logout() {
			var deferred = $q.defer();
			deferred.resolve(AuthService.removeToken());
			return deferred.promise;
		};

	}
})();
