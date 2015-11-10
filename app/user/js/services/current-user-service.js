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

			var init = function(token){

				var deferred = $q.defer();

				if (token) {
					setCurrentUser(currentUser, function(currentUserSet){
						deferred.resolve(currentUserSet);
					});
				} else if (AuthService.isAuthenticated()){
					setCurrentUser(currentUser, function(currentUserSet){
						deferred.resolve(currentUserSet);
					});
				} else {
					deferred.reject({message: 'there was an error initializing the current user!'});
				}

				return deferred.promise;
			};

			var getCurrentUser = function(){
				return currentUser;
			};

			var setCurrentUser = function(currentUser, cb){
				var payload;
				payload = AuthService.getPayload();
				currentUser.firstname = payload.firstname;
				currentUser.lastname = payload.lastname;
				currentUser.email = payload.email;
				currentUser.username = payload.username;
				currentUser.loggedIn = true;
				cb(currentUser);
			};

			var CurrentUserService = {
				init: init,
				getCurrentUser: getCurrentUser
			};

			return CurrentUserService;
		}

	]);