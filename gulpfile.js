const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const nodemon = require('gulp-nodemon');
const protractor = require('gulp-protractor').protractor;

var files = ['server.js', 'gulpfile.js'];
var appFiles = 'app/**/*.js';

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  gulp.src(['./app/**/*.html', './app/**/*.css'])
    .pipe(gulp.dest('./build'));
});

gulp.task('lint:server', () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:browser', () => {
  return gulp.src(appFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('protractor', () => {
  gulp.src(['./test/e2e/spec.js'])
    .pipe(protractor(
      {
        configFile: 'test/e2e/config.js',
        args: ['--baseUrl', 'http:127.0.0.1:5000']
      }))
    .on('error', (e) => { throw e; });
});

gulp.task('develop', () => {
  nodemon({
    script: 'server.js',
    ext: 'html js css !/build/**/*',
    ignore: [],
    tasks: ['lint']
  })
  .on('restart', () => {
    console.log('restarted!');
  });
});

gulp.task('supertask', ['build:dev', 'protractor', 'develop']);
gulp.task('lint', ['lint:server', 'lint:browser']);
gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('default', ['build:dev']);
