(function(){
	'use strict';

	angular
		.module('resume.login')
		.factory('ForgotPasswordService', ForgotPasswordService);

	ForgotPasswordService.$inject = ['$rootScope', '$http'];

	function ForgotPasswordService() {

		var self = this;

		////////////PUBLIC API////////////

		var ForgotPasswordService = {
			resetPassword: resetPassword
		};

		return ForgotPasswordService;

		///////////PUBLIC METHODS////////////

		function resetPassword(user) {
			return $http.post('/reset-password', user);
		};

	}

})();

