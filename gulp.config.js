(function () {

    'use strict';

    module.exports = function () {
        return {

            //specify js files to pipe in the gulpfile
            srcFiles: [
				'./app/**/**/**/*.js',
                './app/**/**/*.js',
				'./app/**/*.js',
				'./*.js',
                '*.js'
			],
            bowerOptions: {
                bowerJson: require('./bower.json'),
                directory: './vendor',
                ignorePath: '../vendor'
            },
            injectCssSrc: ['./app/**/*.css'],
            ignorePaths: {
                ignorePath: ['/app', '/vendor']
            },
            serveOptions: {
                script: './bin/www',
                delayTime: 1,
                watch: [
				    './app/**/**/**/*.js',
				    './app/**/*.js',
				    './*.js',
                    '*.js']
            }
        };
    };

})();