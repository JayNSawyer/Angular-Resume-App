  'use strict';

  import gulp from 'gulp';
  import yargs from 'yargs';
  import gulpConfig from './gulp.config';
  import nodemon from 'gulp-nodemon';
  import gulpLoadPlugins from 'gulp-load-plugins';
  import wiredep from 'wiredep.stream';

  const args = yargs.argv;
  const config = gulpConfig();
  const $gulp = gulpLoadPlugins({
  	lazy: true
  });


  gulp.task('lint', () => {
  	return gulp.src(config.srcFiles)
  		.pipe($gulp.if(args.verbose, $gulp.print()))
  		.pipe($gulp.jscs())
  		.pipe($gulp.jshint())
  		.pipe($gulp.jshint.reporter('jshint-stylish', {
  			verbose: true
  		}));
  });

  gulp.task('inject', () => {
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

  gulp.task('serve', ['lint', 'inject'], () => {

  	log('Analyzing files...');

  	return nodemon(config.serveOptions)
  		.on('restart', (e) => {
  			console.log('Restarting server...')
  		})
  });

  ////////

  function log(msg) {
  	if (typeof (msg) === 'object') {
  		for (var item in msg) {
  			if (msg.hasOwnProperty(item)) {
  				$gulp.util.log($gulp.util.colors.blue(msg[item]));
  			}
  		}
  	} else {
  		$gulp.util.log($gulp.util.colors.blue(msg));
  	}
  }