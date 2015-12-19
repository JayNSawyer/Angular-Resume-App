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
			UserService = $injector.get('UserService'),
			NotifierService = $injector.get('NotifierService');

		var vm = this;	


		$scope.greeting = 'Welcome to the Resume App!';

		$scope.closeAlert = function(){
			console.log('You called me!');
		};

		$scope.createNotifier = function(){
			var notifier = {event: 'success', message: 'this is a success!'};
			NotifierService.addNotifier(notifier.event, notifier.message);
		};
	}
]);