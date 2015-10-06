'use strict'

angular.module('resume.main').controller('MainCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope'),
			UserService = $injector.get('UserService');

			UserService.getUsers().then(function(users){
				$scope.users = users;
			});
	}

]);