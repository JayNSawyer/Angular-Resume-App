'use strict'

angular.module('resume.navigation').controller('NavigationCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope');
		var $state = $injector.get('$state');
		var LoginService = $injector.get('LoginService');
		var LogoutService = $injector.get('LogoutService');
		var CurrentUserService = $injector.get('CurrentUserService');
		var AlertService = $injector.get('AlertService');
		var AuthService = $injector.get('AuthService');
		var $location = $injector.get('$location');
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
			CurrentUserService.init().then(function(currentUser){
				vm.currentUser = currentUser;
			});
		});

		$scope.$watch(function(){
			return vm.currentUser; //watch this vm
		}, function(newProp, oldProp){ 
			if(newProp && newProp.loggedIn){ //the user is authenticated, so continue with setups
				vm.showDashboard();
			}
		});

	}
]);