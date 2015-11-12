(function(){
	'use strict';

	angular
		.module('resume', [
			//Angular  modules
			'ngResource',
			'ngRoute',
			//Vendor modules
			'ui.router',
			'resume.shared',
			'resume.auth',
			'resume.login',
			'resume.logout',
			'resume.main',
			'resume.navigation',
			'resume.register',
			'resume.user'
		]);
})();
