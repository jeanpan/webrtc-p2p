var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var nodemon = require('gulp-nodemon');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var plumber = require('gulp-plumber');
var rename = require("gulp-rename");

// script
gulp.task('clean:script', function() {
    del('./public/js/*')
})

gulp.task('script', ['clean:script'], function() {
  return gulp.src('./app/app.js')
    .pipe(webpack(webpackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'));
});

// style
gulp.task('style', function() {
  return gulp.src('public/css/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, csso()))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('public/css'));
});

// watch
gulp.task('watch:script', function() {
  return gulp.watch('./app/**/*', ['script'])
});

gulp.task('watch:style', function() {
  return gulp.watch('./public/css/*.scss', ['style'])
});

// node server
gulp.task('serve:node', function(done) {
  nodemon({
    exec: 'node ./node_modules/babel-cli/bin/babel-node.js ./server.js',
    watch: ['server.js'],
    ext: 'js html'
  });
});

// main tasks
gulp.task('serve', ['serve:node']);
gulp.task('build', ['script', 'style']);
gulp.task('watch', ['script', 'watch:script', 'style', 'watch:style']);
gulp.task('default', ['serve']);
