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

			var currentUser = {};

			var init = function(token){

				var deferred = $q.defer();

				if (token) {
					setCurrentUser(function(currentUser){
						deferred.resolve(currentUser);
					});
				} else if (AuthService.isAuthenticated()){
					setCurrentUser(function(currentUser){
						deferred.resolve(currentUser);
					});
				} else {
					deferred.reject('Unable to initialize user');
				}

				return deferred.promise;

			};

			var getCurrentUser = function(){

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
			};

			var setCurrentUser = function(cb){
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