// Karma configuration
// Generated on Thu Jan 07 2016 02:35:50 GMT-0500 (EST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
    'vendor/jquery/dist/jquery.js',
    'vendor/angular/angular.js',
    'vendor/angular-route/angular-route.js',
    'vendor/angular-resource/angular-resource.js',
    'vendor/angular-ui-router/release/angular-ui-router.js',
    'vendor/angular-animate/angular-animate.js',
    'vendor/bootstrap/dist/js/bootstrap.js',
    'vendor/angular-mocks/angular-mocks.js',
    'app/core/js/app.modules.js',
    'app/writers/js/**/*.js',
    'app/user/js/**/*.js',
    'app/shared/js/**/*.js',
    'app/register/js/**/*.js',
    'app/navigation/js/**/*.js',
    'app/main/js/**/*.js',
    'app/logout/js/**/*.js',
    'app/login/js/**/*.js',
    'app/auth/js/**/*.js',
    'app/core/js/app.js',
    'app/core/js/app.constants.js',
    'app/core/js/app.config.js',
    'app/auth/js/auth.config.js'
    ],


        // list of files to exclude
        exclude: [
    ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}