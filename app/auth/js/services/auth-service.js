(function() {
	'use strict';

	angular
		.module('resume.auth')
		.factory('AuthService', AuthService);

	AuthService.$inject = ['$window', 'DecodeTokenService'];

	function AuthService($window, DecodeTokenService) {

		var saveToken = function(token) {
			$window.localStorage.userToken = token;
		};

		var getToken = function() {
			return $window.localStorage.userToken;
		};

		var removeToken = function() {
			$window.localStorage.clear();
		};

		var getPayload = function() {
			var token = getToken();
			var payload;

			if (!token) {
				return false;
			} else {
				payload = DecodeTokenService.decodeToken(token);
				return payload;
			}
		};

		var isAuthenticated = function() {
			return getToken();
		};

		return {
			saveToken: saveToken,
			getToken: getToken,
			isAuthenticated: isAuthenticated,
			getPayload: getPayload,
			removeToken: removeToken
		};
	}
})();
