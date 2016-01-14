(function () {
    'use strict';

    var gulp = require('gulp');
    var args = require('yargs').argv;
    var config = require('./gulp.config')();
    var nodemon = require('gulp-nodemon');


    var $gulp = require('gulp-load-plugins')({
        lazy: true
    }); //$gulp will automagically load node module names of 'gulp' and 'gulp-'

    var wiredep = require('wiredep').stream;

    gulp.task('lint', function () {
        return gulp.src(config.srcFiles)
            .pipe($gulp.if(args.verbose, $gulp.print()))
            .pipe($gulp.jscs())
            .pipe($gulp.jshint())
            .pipe($gulp.jshint.reporter('jshint-stylish', {
                verbose: true
            }));
    });

    gulp.task('inject', function () {
        var injectCssSrc = gulp.src(config.injectCssSrc, {
            read: false
        });

        gulp.src('./views/*.ejs')
            .pipe(wiredep(config.bowerOptions)) //wiredep only loads bower dependencies 
            .pipe($gulp.inject(injectCssSrc, config.ignorePaths))
            .pipe($gulp.inject(
                gulp.src([config.srcFiles[0], config.srcFiles[1]])
                .pipe($gulp.angularFilesort()), config.ignorePaths
            ))
            .pipe(gulp.dest('./views'));

    });

    gulp.task('serve', ['lint', 'inject'], function () {

        return nodemon(config.serveOptions)
            .on('restart', function(e){
                console.log('Restarting server...')
        })
    });

})();