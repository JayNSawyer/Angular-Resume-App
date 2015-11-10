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

			vm.showDashboard = function(){
				console.log('show dashboard called!');
				return true;
			};

			vm.hideDashboard = function(){
				if( !AuthService.isAuthenticated() ){
					return true;
				}
			};

			/* NOTE: extract CurrentUserService functionality to top-level controller */
			var init = function(){
				var currentUser;

				currentUser = CurrentUserService.getCurrentUser();
				if (currentUser){
					vm.currentUser = currentUser;
					console.log(currentUser);
				} else {
					vm.currentUser = null;
				}
			};

			vm.logout = function(){
				
				LogoutService.logout().then(function(data){
					AlertService.emitAlert('user-logged-out').then(function(alert){
						vm.currentUser = '';
						$location.path( "/main" );
					});
				});
			};


			init();

			
			$scope.$onRootScope('user-logged-in', function(event, msg){
					var currentUser = CurrentUserService.getCurrentUser();
					if (!currentUser){
						vm.currentUser = null;
					} else {
						vm.currentUser = currentUser;
					}
			});

			$scope.$onRootScope('user-registration-success', function(event, msg){
					var currentUser = CurrentUserService.getCurrentUser();
					if (!currentUser){
						vm.currentUser = null;
					} else {
						vm.currentUser = currentUser;
					}
			});

			$scope.$watch(function(){
				return vm.currentUser; //watch this vm
			}, function(newProp, oldProp){ 
				if(newProp && newProp.loggedIn){ //the user is authenticated, so continue with setups
					vm.showDashboard();
				}
			});
	}
})();
