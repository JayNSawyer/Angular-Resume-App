'use strict';

module.exports = function () {

	let client = './client/';

	let config = {

			//specify js files to pipe in the gulpfile
		srcFiles: [
			'./client/**/**/**/*.js',
			'./client/**/**/*.js',
			'./client/**/*.js',
			'./*.js',
			'*.js'
			],
		karmaFiles: [
			'vendor/jquery/dist/jquery.js',
			'vendor/angular/angular.js',
			'vendor/angular-route/angular-route.js',
			'vendor/angular-resource/angular-resource.js',
			'vendor/angular-ui-router/release/angular-ui-router.js',
			'vendor/angular-animate/angular-animate.js',
			'vendor/bootstrap/dist/js/bootstrap.js',
			'vendor/angular-mocks/angular-mocks.js',
			'client/core/js/app.modules.js',
			'client/writers/js/**/*.js',
			'client/user/js/**/*.js',
			'client/shared/js/**/*.js',
			'client/register/js/**/*.js',
			'client/navigation/js/**/*.js',
			'client/main/js/**/*.js',
			'client/logout/js/**/*.js',
			'client/login/js/**/*.js',
			'client/auth/js/**/*.js',
			'client/core/js/app.js',
			'client/core/js/app.constants.js',
			'client/core/js/app.config.js',
			'client/auth/js/auth.config.js'
		],
		integrationSpecs: ['./client' + '/test/integration/**/*.spec.js'],
		specHelpers: ['./client' + '/test/helpers/*.js'],
		allClientFiles: [
			'./client/**/*.*'
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
				'*.js'
			]
		}
};

config.karma = getKarmaOptions();

return config;

/////////////

function getKarmaOptions() {
	let options = {
		files: config.karmaFiles,
		exclude: [],
		coverage: {
			dir: './report/' + 'coverage',
			reporters: [
				{
					type: 'html',
					subdir: 'report-html'
				},
				{
					type: 'lcov',
					subdir: 'report-lcov'
				},
				{
					type: 'text-summary'
				}
				]
		},
		preprocessors: {}
	};
	options.preprocessors[client + '**/!(*.spec)+(.js)'] = ['coverage'];
	return options;
}
};