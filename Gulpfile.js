(function () {
    'use strict';

    var gulp = require('gulp');
    var args = require('yargs').argv;
    var angularFilesort = require('gulp-angular-filesort');
    var config = require('./gulp.config')();


    var $gulp = require('gulp-load-plugins')({
        lazy: true
    }); //$gulp will automagically load node module names of 'gulp' and 'gulp-'

    var wiredep = require('wiredep').stream;

    gulp.task('build', function () {
        return gulp.src(config.srcFiles)
            .pipe($gulp.if(args.verbose, $gulp.print()))
            .pipe($gulp.jscs())
            .pipe($gulp.jshint())
            .pipe($gulp.jshint.reporter('jshint-stylish', {
                verbose: true
            }));
    });

    gulp.task('inject', function () {

        var options = {
            bowerJson: require('./bower.json'),
            directory: './vendor',
            ignorePath: '../vendor'
        };

        var injectSrc = gulp.src([
            './app/**/**/**/*.js',
            './app/**/*.js',
            './vendor/eternityforms/js/*.min.js',
            './vendor/polyfills/*.js',
            './app/**/*.css']);
        
        var injectOptions = {
            ignorePath: ['/app', '/vendor']
        };

        return gulp.src('./views/*.ejs')
            .pipe(wiredep(options)) //wiredep only loads bower dependencies
            .pipe($gulp.inject(injectSrc, injectOptions)) //to load non-bower dependencies
            .pipe(angularFilesort())
            .pipe(gulp.dest('./views'));
    });

})();