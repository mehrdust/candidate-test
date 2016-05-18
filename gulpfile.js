// gulp
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

// plugins
var connect = require('gulp-connect'),
    inject = require('gulp-inject'),
	bowerFiles = require('main-bower-files'),
    stylus = require('gulp-stylus'),
    es = require('event-stream');

var cssFiles = gulp.src('./**/*.styl', {cwd: __dirname + '/front_end'})
  	.pipe(stylus())
  	.pipe(gulp.dest('./front_end'));

gulp.src('./front_end/index.html')
  	// .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
  	.pipe(inject(es.merge(
    	cssFiles,
    	gulp.src('./app/**/*.js', {read: false, cwd: __dirname + '/front_end'})
	)))
  	.pipe(gulp.dest('./front_end'));

gulp.task('connect', function () {
  	connect.server({
    	root: 'front_end/',
    	port: 8888
  	});
});

// default task
gulp.task('default',
  	['connect']
);
