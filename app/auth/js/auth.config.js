(function() {
    'use strict';
	angular
		.module('resume.auth')
		.config([
			'$httpProvider',
			function($httpProvider) {
				$httpProvider.interceptors.push('AuthInterceptorService');
			}
		]);
})();
