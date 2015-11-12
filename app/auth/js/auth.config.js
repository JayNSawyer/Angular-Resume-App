(function() {
    'use strict';

	angular
		.module('resume.auth')
		.config(AuthConfig)

	AuthConfig.$inject = ['$httpProvider'];	

	function AuthConfig($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptorService');
	} 		

})();
