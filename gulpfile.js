const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const minify = require("gulp-minify-css");
const concat = require("gulp-concat");
const htmlmin = require("gulp-htmlmin");

gulp.task("styles", () => {
  return gulp
    .src("./style/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./style/css/"));
});
gulp.task("minify-html", function () {
  return gulp
    .src("./src/index.html") // указываем пути к файлам .html
    .pipe(
      htmlmin({
        collapseWhitespace: true, // удаляем все переносы
        removeComments: true, // удаляем все комментарии
      })
    )
    .pipe(gulp.dest("./")); // оптимизированные файлы .html переносим на продакшен
});
gulp.task("minify", function () {
  gulp.src("./style/css/*.css").pipe(minify()).pipe(gulp.dest("./style/css/"));
});
gulp.task("watch", () => {
  gulp.watch("style/scss/**/*.scss", (done) => {
    gulp.series(["styles", "minify"])(done);
  });
  gulp.watch("./src/index.html", (done) => {
    gulp.series(["minify-html"])(done);
  });
});

gulp.task("default", gulp.series(["styles", "minify"]));
