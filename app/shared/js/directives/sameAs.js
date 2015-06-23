'use strict'

angular.module('resume').directive('sameAs', [
	'$rootScope',
	function($rootScope){
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ngModelCtrl){
				ngModelCtrl.$validators.sameAs = function(modelValue){
					if (modelValue === scope.$eval(attrs.sameAs)){
						return true;
					} else {
						return false;
					}
				}
				scope.$watch(attrs.sameAs, function(){
					ngModelCtrl.$validate();
				});
			}
		}	
	}
]);