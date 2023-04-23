var gulp = require("gulp");

var sass = require("gulp-sass")(require("sass"));
var uglifycss = require("gulp-uglifycss");

function buildStyles() {
  return gulp
    .src("./sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
}

function minifyStyles() {
  return gulp
    .src("./css/*.css")
    .pipe(
      uglifycss({
        maxLineLen: 80,
        uglyComments: true,
      })
    )
    .pipe(gulp.dest("./dist"));
}

async function run() {
  await buildStyles();
  await minifyStyles();
}

function watch() {
  gulp.watch("./sass/*.scss", buildStyles);
  gulp.watch("./css/*.css", minifyStyles);
}

async function watchAndRun() {
    watch();
    await run();
}

exports.buildStyles = buildStyles;
exports.minifyStyles = minifyStyles;
exports.run = run;
exports.watch = watch;
exports.watchAndRun = watchAndRun;
