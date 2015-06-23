'use strict'

angular.module('resume').controller('RegisterCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope');
		var AuthService = $injector.get('AuthService');
	//	var CurrentUserService = $injector.get('CurrentUserService');
		var vm = this;

		vm.username = '';
		vm.password = '';
		vm.validationObject;

		vm.login = function(username, password){

		};

		// vm.login = function(username, password){
		// 	vm.loginObject = Auth.verifyCredentials(username, password);
		// 	if(vm.loginObject.boolean){ //if true, then credentials checked
		// 		 //log the user in
		// 		console.log(vm.loginObject.message);

		// 		//call the UserService, which will set the vm.username and make a call to /api/users/:user to grab the user's profile
		
		// 	} else if (vm.loginObject.error) {
		// 		console.log(vm.loginObject.message);
		// 	}
		// }
	}
]);