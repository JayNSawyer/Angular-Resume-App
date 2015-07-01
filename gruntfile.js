
module.exports = function(grunt){
	grunt.initConfig({
		nodemon: {
			all: {
				script: './bin/www',
				options: {
					watchedExpressions: ['js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.registerTask('default', ['nodemon']);

};