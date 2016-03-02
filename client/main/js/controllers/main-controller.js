(function(){
	'use strict';

	angular 
		.module('resume.main')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$rootScope', '$scope', 'UserService'];
	
	function MainCtrl($rootScope, $scope, UserService) {
		UserService.getUsers()
			.then(function (users) {
				$scope.users = users;
			});
	}	

})();

