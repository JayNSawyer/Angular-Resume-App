(function(){
	'use strict';

	angular
		.module('resume.login')
		.controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

	ForgotPasswordCtrl.$inject = ['$scope', 'ForgotPasswordService'];	

	function ForgotPasswordCtrl($scope, ForgotPasswordService) {

		var vm = this;

		vm.resetPassword = function() {
			ForgotPasswordService.resetPassword(vm.user).then(function(response){
				//TODO
			});
		};
	}
	
})();

