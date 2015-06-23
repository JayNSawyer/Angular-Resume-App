'use strict';

angular.module('resume')
	.factory('CurrentUserService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$q = $injector.get('$q'),
				$http = $injector.get('$http'),
				$window = $injector.get('$window'),
				ValidationService = $injector.get('ValidationService');

			var self = this;	

			var setProfile = function(username, token){
				profile.username = username;
				profile.token = token;
			}

			var getToken = function(){
				if(!cachedToken){
					cachedToken = $window.localStorage['userToken'];
				}
				return cachedToken;
			};

			var isAuthenticated = function(){
				var token = getToken();
				return token;
			};

			var CurrentUserService = {
				setProfile: setProfile,
				getToken: getToken,
				isAuthenticated: isAuthenticated
	
			}
			return CurrentUserService;
		}

	]);