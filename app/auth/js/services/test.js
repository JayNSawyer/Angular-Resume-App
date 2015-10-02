(function(){
	'use strict';

	angular
		.module('resume')
		.factory('YourService', YourService);

	YourService.$inject = ['q'];

	function YourService($q){

	    var myVar = '';

	    return {
			publicFunc: publicFunc
		};

        //public methods
		var publicFunc = function(){

		};

		//private methods
		function _privateFunc(){

		}
	}

})();