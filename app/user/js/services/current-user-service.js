'use strict';

angular.module('resume')
	.factory('CurrentUserService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$http = $injector.get('$http'),
				$window = $injector.get('$window'),
				AuthService = $injector.get('AuthService');

			var self = this;	

			var currentUser = {
				firstname: '',
				lastname: '',
				email: '',
				username: '',
				token: '',
				loggedIn: false
			};

			var init = function(){
				if(AuthService.isAuthenticated()){
					
					var token = AuthService.getToken();
					var payload = AuthService.getPayload();
			
					currentUser.firstname = payload.firstname;
					currentUser.lastname = payload.lastname;
					currentUser.email = payload.email;
					currentUser.username = payload.username;
					currentUser.token = token;
					currentUser.loggedIn = true;

					return currentUser;
				}
			};

			var CurrentUserService = {
				init: init
			};

			return CurrentUserService;
		}

	]);