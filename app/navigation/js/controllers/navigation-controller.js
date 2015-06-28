'use strict'

angular.module('resume').controller('NavigationCtrl', [
	'$scope',
	'$injector',
	function($scope, $injector){
		var $rootScope = $injector.get('$rootScope');
		var $state = $injector.get('$state');
		var LoginService = $injector.get('LoginService');
		var LogoutService = $injector.get('LogoutService');
		var CurrentUserService = $injector.get('CurrentUserService');
		var AlertService = $injector.get('AlertService');
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

		vm.logout = function(){
			
			LogoutService.logout().then(function(data){

				AlertService.emitAlert({event: 'user-logged-out'}).then(function(alert){

					var logoutAlert = alert;
					$rootScope.$emit('user-logged-out', {
						auth: false,
						payload: null,
						alert: logoutAlert
					});

					vm.currentUser = '';
					$location.path( "/main" );

				});
			});
		};

		// vm.logout = function(){
		// 	LogoutService.logout();
		// 	vm.currentUser = '';
		// };

		vm.currentUser;
		
		//	bootstrap the entire app with the current user info by listening to user login/logout
		$scope.$onRootScope('user-logged-in', function(event, msg){
			if(msg.payload){
				CurrentUserService.init().then(function(currentUser){
					vm.currentUser = currentUser;
				});
			}
		});

		// $rootScope.$on('user-logged-out', function(event, msg){
		// 	if(msg.auth === false){
		// 		vm.currentUser = '';
		// 	}
		// });

		// $rootScope.$on('user-logged-out', function(event, msg){
		// 	console.log('logged out!');
		// });


		$scope.$watch(function(){
			return vm.currentUser; //watch this vm
		}, function(newProp, oldProp){ 
			if(newProp && newProp.loggedIn){ //the user is authenticated, so continue with setups
				vm.showDashboard();
			}
		});

	}
]);