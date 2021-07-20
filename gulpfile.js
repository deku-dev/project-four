const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify-css');
const concat = require('gulp-concat');

gulp.task('styles', () => {
    return gulp.src('./scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css/'));
});
gulp.task('minify', function(){
    gulp.src('css/*.css')
        .pipe(minify())
        .pipe(gulp.dest('./css/'));
});
gulp.task('watch', () => {
    gulp.watch('scss/**/*.scss', (done) => {
        gulp.series(['styles', 'minify'])(done);
    });
});
gulp.task('default', gulp.series(['styles', 'minify']));
