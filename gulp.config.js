(function() {

    'use strict';

	module.exports = function () {
		return {

			//specify js files to pipe in the gulpfile
			srcFiles: [
				'./app/**/**/**/*.js',
				'./app/**/*.js',
				'./*.js'
			]
		};
	};

})();