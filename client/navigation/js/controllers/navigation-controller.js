(function(){
	'use strict';

	angular
		.module('resume.navigation')
		.controller('NavigationCtrl', NavigationCtrl);

	NavigationCtrl.$inject = [
		'$scope',
		'$rootScope', 
		'$state', 
		'$location', 
		'$http', 
		'LogoutService', 
		'CurrentUserService',
		'AlertService',
		'AuthService'
	];

	function NavigationCtrl (
		$scope,
		$rootScope,
		$state,
		$location,
		$http,
		LogoutService,
		CurrentUserService,
		AlertService,
		AuthService) {

			var vm = this;

			vm.showDashboard = showDashboard;
			vm.hideDashboard = hideDashboard;
			vm.logout = logout;

			_init();


			function showDashboard() {
				console.log('show dashboard called!');
				return true;
			}

			function hideDashboard() {
				return !AuthService.isAuthenticated();
			}

			function logout() {
				LogoutService.logout()
					.then(function(data) {
						return AlertService.emitAlert('user-logged-out');
					})
					.then(function(alert){
						vm.currentUser = '';
						$location.path("/main");
					});
			}

			function _init() {
				var currentUser;

				CurrentUserService.getCurrentUser()
					.then(function(currentUser){
						vm.currentUser = currentUser;
						vm.showDashboard();
						console.log(vm.currentUser);
					})
					.catch(function(error){
						vm.currentUser = null;
						console.log(error);
					});
			}

		
			$scope.$onRootScope('user-logged-in', function(event, msg){
				_init();
			});

			$scope.$onRootScope('user-registration-success', function(event, msg){
				_init();
			});

	}
})();
