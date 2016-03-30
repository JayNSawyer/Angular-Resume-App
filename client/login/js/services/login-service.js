(function () {
	'use strict';

	angular
		.module('resume.login')
		.factory('LoginService', LoginService);

	LoginService.$inject = ['$rootScope', '$http'];

	function LoginService($rootScope, $http) {

		////////////PUBLIC API////////////

		var LoginService = {
			login: login
		};

		return LoginService;

		///////////PUBLIC METHODS////////////

		function login(user) {
			return $http.post('/login', user)
				.then(function (response) {
					return response.data.token;
				})
				.catch(function (error) {
					return error.data.message;
				});
		};

	}
})();