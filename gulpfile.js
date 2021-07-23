const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");

gulp.task("styles", () => {
  return gulp
    .src("./style/scss/*.scss")

    .pipe(sass().on("error", sass.logError))

    .pipe(gulp.dest("./style/css/"));
});
gulp.task("minify-html", function () {
  return gulp
    .src("./src/index.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true, 
      })
    )
    .pipe(gulp.dest("./")); 
gulp.task("minify-css", () => {
  return gulp
    .src("style/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(
      cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./"));
});
gulp.task("watch", () => {
  gulp.watch("style/scss/*.scss", (done) => {
    gulp.series(["styles"])(done);
  });
  gulp.watch("./src/index.html", (done) => {
    gulp.series(["minify-html"])(done);
  });
  gulp.watch("style/css/*.css", (done) => {
    gulp.series(["minify-css"])(done);
  });
});

gulp.task("default", gulp.series(["styles", "minify-html", "minify-css"]));
