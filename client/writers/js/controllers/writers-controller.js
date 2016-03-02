(function(){
	'use strict';

	angular
		.module('resume.writers')
		.controller('WritersCtrl', WritersCtrl);

	WritersCtrl.$inject = ['$scope'];
	
	function WritersCtrl($scope) {
		$scope.title = "Writers Controller Template";
	}	
})();