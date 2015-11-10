(function(){
	'use strict';

	angular
		.module('resume.login')
		.factory('LoginService', LoginService);

	LoginService.$inject = ['$rootScope', '$http'];

	function LoginService ($rootScope, $http) {

		var self = this;

		var login = function(user){
			return $http.post('/login', user);
		};

		var LoginService = {
			login: login
		};

		return LoginService;

	}
})();

