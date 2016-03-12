(function(){
	'use strict';

	angular
		.module('resume.user')
		.factory('CurrentUserService', CurrentUserService);

	CurrentUserService.$inject = ['$rootScope', '$window', '$q', 'AuthService'];
	
	function CurrentUserService($rootScope, $window, $q, AuthService) {

		var self = this;	

		var currentUser = {};

		////////////PUBLIC API////////////

		var CurrentUserService = {
			init: init,
			getCurrentUser: getCurrentUser,
			logout: logout
		};

		return CurrentUserService;

		///////////PUBLIC METHODS////////////

		function init(token) {

			var deferred = $q.defer();

			if (token || AuthService.isAuthenticated()) {
				//we've got a token (an authenticated user), but current user hasn't been initialized
				_setCurrentUser(function(currentUser){
					deferred.resolve(currentUser);
				});
			} else {
				deferred.reject('Unable to initialize user');
			}

			return deferred.promise;

		}

		function getCurrentUser() {

			var deferred = $q.defer();

			if (currentUser && currentUser.loggedIn){
				deferred.resolve(currentUser);
			} else if (currentUser && !currentUser.loggedIn) { 
				init()
					.then(function(currentUser){
						deferred.resolve(currentUser);
					})
					.catch(function(error){
						deferred.reject(error);
					});
			} else {
				deferred.reject('Unable to get current user');
			}

			return deferred.promise;
		}
		
		//TODO: promisify AuthService to obviate the need for deferred below!
		function logout() {
			var deferred = $q.defer();
			deferred.resolve(AuthService.removeToken());
			return deferred.promise;
		}

		////////////PRIVATE METHODS///////////

		function _setCurrentUser(cb) {
			var payload;
			payload = AuthService.getPayload();
			currentUser.firstname = payload.firstname;
			currentUser.lastname = payload.lastname;
			currentUser.email = payload.email;
			currentUser.username = payload.username;
			currentUser.loggedIn = true;
			cb(currentUser);
		}

	}	
})();
