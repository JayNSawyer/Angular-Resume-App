'use strict';

angular.module('resume')
	.factory('UserService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$q = $injector.get('$q'),
				$http = $injector.get('$http');

			var self = this;	

			var UserService = {
				getUsers: function(){

					var deferred = $q.defer();

					$http.get('/api/users').then(function(data){			
						deferred.resolve(data.data);
					}, function(error){
						console.log(error);
						deferred.reject(error);
					});

					return deferred.promise;
				}
			}
			return UserService;
		}

	]);