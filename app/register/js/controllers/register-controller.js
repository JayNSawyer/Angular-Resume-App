'use strict'

angular.module('resume').controller('RegisterCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope');
		var AuthService = $injector.get('AuthService');
	//	var CurrentUserService = $injector.get('CurrentUserService');
	//  var RegisterService = $injector.get('RegisterService');
		var vm = this;


		vm.firstname = '';
		vm.lastname = '';
		vm.username = '';
		vm.email = '';
		vm.password = '';
		vm.passwordConfirmation = '';

		vm.error = false;


		//vm.validationObject;

		vm.submit = function(){
			console.log('submitted!');
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