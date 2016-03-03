(function () {

    'use strict';

    module.exports = function () {
        return {

            //specify js files to pipe in the gulpfile
            srcFiles: [
				'./client/**/**/**/*.js',
                './client/**/**/*.js',
				'./client/**/*.js',
				'./*.js',
                '*.js'
			],
            bowerOptions: {
                bowerJson: require('./bower.json'),
                directory: './vendor',
                ignorePath: '../vendor'
            },
            injectCssSrc: ['./client/**/*.css'],
            ignorePaths: {
                ignorePath: ['/client', '/vendor']
            },
            serveOptions: {
                script: './bin/www',
                delayTime: 1,
                watch: [
				    './client/**/**/**/*.js',
				    './client/**/*.js',
				    './*.js',
                    '*.js']
            }
        };
    };

})();