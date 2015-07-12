'use strict'

angular.module('resume.shared').controller('AppCtrl', [
	'$scope',
	'$injector',
	function ($scope, $injector){
		var $rootScope = $injector.get('$rootScope'),
			$http = $injector.get('$http'),
			CurrentUserService = $injector.get('CurrentUserService'),
			$timeout = $injector.get('$timeout'),
			AlertService = $injector.get('AlertService'),
			UserService = $injector.get('UserService');

		var vm = this;	


		$scope.greeting = 'Welcome to the Resume App!';

		$scope.closeAlert = function(){
			console.log('You called me!');
		};
	}
]);