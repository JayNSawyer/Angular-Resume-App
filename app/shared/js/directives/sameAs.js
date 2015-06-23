'use strict'

angular.module('resume').directive('sameAs', [
	'$rootScope',
	function($rootScope){
		return {
			scope: {
				sameAsModel: '=sameAsModelValue'
			},
			require: 'ngModel',
			link: function(scope, element, attr, ngModel){
				ngModel.$validators.sameAsModel = function(formModelValue){
					return formModelValue === scope.sameAsModel.$modelValue;
				};

				scope.$watch('sameAs', function() {
					ngModel.$validate();
				});
			}
		}
	}
]);