(function() {
	'use strict';

	var gulp = require('gulp');
    var jshint = require('gulp-jshint');
    var jscs = require('gulp-jscs');
    var gulpPrint = require('gulp-print');

    gulp.task('vet', function() {
        return gulp.src([
            './app/**/**/**/*.js',
            './app/**/*.js',
            './*.js'
            ])
            .pipe(gulpPrint())
            .pipe(jscs())
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish', {verbose: true}));

    });

})();
