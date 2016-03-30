(function(){
	'use strict';

	angular
		.module('resume', [
			//Angular  modules
			'ngResource',
			'ngRoute',
			'ngAnimate',
			//Vendor modules
			'ui.router',
			'resume.shared',
			'resume.auth',
			'resume.login',
			'resume.main',
			'resume.navigation',
			'resume.register',
			'resume.user',
			'resume.writers'
		]);
})();
