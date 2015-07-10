'use strict';

angular.module('resume.user')
	.factory('CurrentUserService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$window = $injector.get('$window'),
				$q = $injector.get('$q'),
				AuthService = $injector.get('AuthService');

			var self = this;	

			var currentUser = {
				firstname: '',
				lastname: '',
				email: '',
				username: '',
				loggedIn: false
			};

			var init = function(){

				var deferred = $q.defer();

				if(AuthService.isAuthenticated()){
					
					var token = AuthService.getToken();
					var payload = AuthService.getPayload();
			
					currentUser.firstname = payload.firstname;
					currentUser.lastname = payload.lastname;
					currentUser.email = payload.email;
					currentUser.username = payload.username;
					currentUser.loggedIn = true;
					deferred.resolve(currentUser);
				} else {
					deferred.reject({message: 'there was an error retrieving the current user!'});
				}

				return deferred.promise;
			};

			var getCurrentUser = function(){
				if( AuthService.isAuthenticated() ){
					return currentUser;
				}
			};

			var CurrentUserService = {
				init: init,
				getCurrentUser: getCurrentUser
			};

			return CurrentUserService;
		}

	]);