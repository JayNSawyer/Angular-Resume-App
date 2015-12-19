(function(){
	'use strict';

	angular
		.module('resume.shared')
		.directive('resumeNotifiers', resumeNotifiers);

	resumeNotifiers.$inject = ['NotifierService'];

	function resumeNotifiers (NotifierService) {

		return {
			restrict: 'AE',
			templateUrl: '/shared/views/notifiers.html',
			scope: true,
			controller: function ($scope) {
				$scope.closeNotifier = function closeNotifier (notifier) {
					NotifierService.removeNotifier(notifier);
				};
			},
			link: function (scope) {
				scope.notifierCollection = NotifierService.notifierCollection; //because services are singletons, we will always have reference to the instance..so our array will instantly update when new notifiers are added or removed
			}
		};
	}	
})();