'use strict';

import gulp from 'gulp';
import yargs from 'yargs';
import gulpConfig from './gulp.config';
import nodemon from 'gulp-nodemon';
import gulpLoadPlugins from 'gulp-load-plugins';
import wiredepLib from 'wiredep';
import browserSync from 'browser-sync';

//TODO for 3/8: need karma test coverage!!!!
const args = yargs.argv;
const config = gulpConfig();
const wiredep = wiredepLib.stream;
const $ = gulpLoadPlugins({
	lazy: true
});

gulp.task('default', ['inject'], () => {
	return nodemon(config.serveOptions)
		.on('restart', (e) => {
			log('Restarting server...');
		})
		.on('start', () => {
			log('Nodeman started...');
		})
		.on('crash', () => {
			log('Nodeman crashed...');
		})
		.on('exit', () => {
			log('Nodeman exited...');
		});
});

gulp.task('lint', () => {
	return gulp.src(config.srcFiles)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {
			verbose: true
		}));
});

gulp.task('inject', () => {
	var injectCssSrc = gulp.src(config.injectCssSrc, {
		read: false
	});

	gulp.src('./views/*.ejs')
		.pipe(wiredep(config.bowerOptions)) //wiredep only loads bower dependencies 
		.pipe($.inject(injectCssSrc, config.ignorePaths))
		.pipe($.inject(
			gulp.src([config.srcFiles[0], config.srcFiles[1]])
			.pipe($.angularFilesort()), config.ignorePaths
		))
		.pipe(gulp.dest('./views'));

});

gulp.task('unit-test', (done) => {
	runUnitTests(true, done);
});

gulp.task('serve', ['lint', 'inject'], () => {

	log('Analyzing files...');

	return nodemon(config.serveOptions)
		.on('restart', (e) => {
			log('Restarting server...');
		})
		.on('start', () => {
			log('Nodeman started...');
			//	startBrowserSync();
		})
		.on('crash', () => {
			log('Nodeman crashed...');
		})
		.on('exit', () => {
			log('Nodeman exited...');
		});
});

////////

function runUnitTests(single, done) {
	//will look for karma.conf for settings
	let karma = require('karma').server;
	let excludeFiles = [];
	let integrationSpecs = config.integrationSpecs;

	excludeFiles = integrationSpecs;

	karma.start({
		configFile: __dirname + '/karma.conf.js',
		exclude: excludeFiles,
		singleRun: !!single
	}, karmaCompleted);

	function karmaCompleted(karmaResult) {
		log('Karma completed!' + karmaResult);
		if (karmaResult === 1) {
			done('karma: these failed: ' + karmaResult);
		} else {
			done();
		}
	}
}

function log(msg) {
	if (typeof (msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}