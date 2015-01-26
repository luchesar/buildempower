var gulp = require('gulp'),
  less = require('gulp-less'),
  browserify = require('gulp-browserify'),
  concat = require('gulp-concat'),
  embedlr = require('gulp-embedlr'),
  refresh = require('gulp-livereload'),
  lrserver = require('tiny-lr')(),
  express = require('express'),
  livereload = require('connect-livereload')
  livereloadport = 35729,
  serverport = 5000;


var paths = {
  scripts: [
             'static/assets/js/bootstrap/source/*.js',
             'tatic/assets/js/plugins/source/*.js',
             'static/assets/js/application/source/*.js'
           ],
  images: 'static/assets/images/**/*',
  pages: ["index.html", "static/pages/**/*.html"],
  less: ['static/assets/style/**/*.less']
};

//We only configure the server here and start it only when running the watch task
var server = express();
//Add livereload middleware before static-middleware
server.use(livereload({
  port: livereloadport
}));
server.use(express.static('static'));

gulp.task('less', function(){
  gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest('static/assets/all-styles.css'))
    .pipe(refresh(lrserver));
});

//Task for processing js with browserify
gulp.task('browserify', function(){
  gulp.src(paths.scripts)
   .pipe(browserify())
   .pipe(concat('bundle.js'))
   .pipe(gulp.dest('static/assets/style/all.js'))
   .pipe(refresh(lrserver));

});

//Task for moving html-files to the build-dir
//added as a convenience to make sure this gulpfile works without much modification
gulp.task('html', function(){
  gulp.src('static/pages/**/*.html')
    .pipe(gulp.dest('build'))
    .pipe(refresh(lrserver));
});

//Convenience task for running a one-off build
gulp.task('build', function() {
  gulp.run('html', 'browserify', 'less');
});

gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  server.listen(serverport);

  //Set up your livereload server
  lrserver.listen(livereloadport);
});

gulp.task('watch', function() {

  //Add watching on less-files
  gulp.watch(paths.less, function() {
    gulp.run('less');
  });
  
  //Add watching on js-files
  gulp.watch(paths.scripts, function() {
    gulp.run('browserify');
  });

  //Add watching on html-files
  gulp.watch(paths.pages, function () {
    gulp.run('html');
  });
});

gulp.task('default', function () {
  gulp.run('build', 'serve', 'watch');
});
