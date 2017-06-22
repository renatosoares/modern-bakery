var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var files = ['assets/styles/*.scss', 'assets/scripts/*.js'];

var inputStyles = 'assets/styles/build.scss';
var outputStyles = 'assets/dist/css';

var jsFiles = 'assets/scripts/*.js',
    jsDest = 'assets/dist/js';

gulp.task('styles', function () {
    return gulp
        .src(inputStyles)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.identityMap())
        .pipe(sass().on('error', sass.logError))
        .pipe(minify({keepBreaks: false}))
        .pipe(rename({ suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputStyles));
});

gulp.task('scripts', function() {
    // return gulp.src(jsFiles)
    return gulp
        .src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.identityMap())
        .pipe(concat('build.min.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('build.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(jsDest));
});

//Watch task
gulp.task('default',function() {
    gulp.watch(files,['styles', 'scripts']);
});