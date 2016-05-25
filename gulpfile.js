const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cp = require('child_process');
const protractor = require('gulp-protractor').protractor;
const mongoUri = 'mongodb://localhost/test_server';
const minify = require('gulp-minify-css');
const html = require('html-loader');

var files = ['server.js', 'gulpfile.js'];
var appFiles = 'app/**/*.js';
var testFiles = ['test/e2e/**/*.js', 'test/unit/**/*.js'];
var children = [];

var nodemonOptions = {
  script: 'server.js',
  ext: 'html scss js',
  ignore: ['build/'],
  tasks: ['build']
};

gulp.task('sass', function() {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:dev', ['lint'], () => {
  return gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', () => {
  return gulp.src('test/unit/test_entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('static:dev', () => {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('startservers:test', () => {
  children.push(cp.fork('server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('../rest_api/mark_buchthal/server', [], { env: { MONGO_URI: mongoUri } }));
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

gulp.task('lint:test', () => {
  return gulp.src(testFiles)
  .pipe(eslint({
    'env': {
      'browser': true,
      'jasmine': true,
      'protractor': true
    }
  }))
  .pipe(eslint.format());
});

gulp.task('protractor:test', ['startservers:test', 'build:dev'], () => {
  return gulp.src(['./test/e2e/spec.js'])
    .pipe(protractor(
      {
        configFile: 'test/e2e/config.js',
        args: ['--baseUrl', 'http:127.0.0.1:5000']
      }))
    .on('end', () => {
      children.forEach((child) => {
        child.kill('SIGTERM');
      });
    });
});

gulp.task('develop', () => {
  nodemon({
    script: 'server.js',
    ext: 'html js css',
    ignore: ['build'],
    tasks: ['lint']
  })
  .on('restart', () => {
    console.log('restarted');
  });
});

gulp.task('default', ['build'], () => {
  livereload.listen();
  nodemon(nodemonOptions).on('restart', () => {
    gulp.src('server.js')
      .pipe(livereload());
    console.log('restarted');
  });
});
gulp.task('watch', ['lint', 'build:dev', 'develop']);
gulp.task('lint', ['lint:server', 'lint:browser', 'lint:test']);
gulp.task('build:dev', ['webpack:dev', 'static:dev', 'sass']);
gulp.task('build', ['lint', 'build:dev']);
gulp.task('server-default', ['startservers:test', 'build']);
