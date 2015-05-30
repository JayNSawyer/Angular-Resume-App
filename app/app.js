'use strict';

angular.module('resume', ['ngResource', 'ngRoute'])
	.controller('AppCtrl', [
		'$scope',
		'$injector',
		function ($scope, $injector){
			var $rootScope = $injector.get('$rootScope'),
				$http = $injector.get('$http'),
				UserService = $injector.get('UserService')

			var self = this;	

			$scope.greeting = 'Welcome to the Resume App!';

			this.getUsers = function(){
				return $http.get('/api/users').then(function(data){			
					return data.data;
				}, function(error){
					console.log(error);
				});
			};

			this.getUsers().then(function(data){
				$scope.users = data;
			});
		}
	]);