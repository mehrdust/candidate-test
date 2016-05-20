// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect'),
    inject = require('gulp-inject'),
	bowerFiles = require('main-bower-files'),
    stylus = require('gulp-stylus'),
    angularFilesort = require('gulp-angular-filesort'),
    es = require('event-stream');

var cssFiles = gulp.src('./**/*.styl', {cwd: __dirname + '/front_end'})
  	.pipe(stylus())
  	.pipe(gulp.dest('./front_end'));

gulp.src('./front_end/index.html')
  	// .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
  	.pipe(inject(es.merge(
    	cssFiles,
    	gulp.src('./app/**/*.js', {cwd: __dirname + '/front_end'}).pipe(angularFilesort())
	)))
  	.pipe(gulp.dest('./front_end'));

gulp.task('connect', function () {
  	connect.server({
    	root: 'front_end',
    	port: 8888,
      fallback: './front_end/index.html',
      livereload: true
  	});
});
