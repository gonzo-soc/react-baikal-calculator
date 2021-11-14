/** gulpfile.js */
const gulp = require("gulp");
const { series } = require('gulp');
const path = require("path");
const debug = require("gulp-debug");
const browserSync = require("browser-sync").create();

const webpack = require('webpack');
const gutil = require('gulp-util');
const notifier = require('node-notifier');
const webpackDevConfig = require('./webpack-dev.config.js');
const webpackProdConfig = require('./webpack-prod.config.js');
const statsLog = { // для красивых логов в консоли
  colors: true,
  reasons: true
};

const publicDir = path.join(__dirname, "public");
const appDir = "src";

gulp.task("browser-sync-init", function (done) {
  browserSync.init({
    server: {
      baseDir: publicDir
    }
  });
  done();
});

gulp.task("default", gulp.series("browser-sync-init", function () {
  gulp
    .watch(`${publicDir}/**/*.*`)
    .on("change", path => browserSync.reload(path))
    .on("add", path => browserSync.reload(path));
}));

gulp.task("build-html", function () {
  return gulp
    .src(`${appDir}/**/*.html`, {
      since: gulp.lastRun("build-html")
    })
    .pipe(debug({ title: "build-html" }))
    .pipe(gulp.dest(publicDir));
});

/* 
 * Webpack-related callbacks (private task) 
 */
function onWebpackComplete(error, stats, done) {
  if (error) { // Что-то невероятное
    onWebpackError(error, done);
  } else if (stats.hasErrors()) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
    onWebpackError(stats.toString(statsLog), done);
  } else {
    onWebpackSuccess(stats.toString(statsLog), done);
  }
}

// Функции onError и onSuccess выводят в отформатированном виде информацию пользователю
// Каждая функция должна вызвать колбэк done, который сигнализирует о завершении
// асинхронной задачи build-js, что обязательно требует gulp
function onWebpackError(error, done) {
  let formatedError = new gutil.PluginError('webpack', error);
  notifier.notify({ // чисто чтобы сразу узнать об ошибке
    title: `Error: ${formatedError.plugin}`,
    message: formatedError.message
  });
  gutil.log('[webpack]', error);
  done();
}

function onWebpackSuccess(detailInfo, done) {
  gutil.log('[webpack]', detailInfo);
  done();
}

gulp.task("build-dev-js", (done) => {
  // run webpack
  // webpack имеет свой собственный API, поэтому мы его можем подключать в своих NodeJS приложениях
  // webpack импортируется как обычная функция, которая первым аргументом получает конфиг из webpack.config.js
  // второй аргумент это колбэк, который вызывается по результатам работы сборки webpack
  webpack(webpackDevConfig, (err, stats) => onWebpackComplete(err, stats, done));
}); 

gulp.task("build-prod-js", (done) => {
  webpack(webpackProdConfig, (err, stats) => onWebpackComplete(err, stats, done));
})

gulp.task("build-prod", series("build-html", "build-prod-js"));

gulp.task("build-dev", series("build-html", "build-dev-js"));
gulp.task("dev-watch", gulp.series("browser-sync-init", function () {
  gulp
    .watch(`${appDir}/**/*.*`)
    .on("change", gulp.series("build-dev", (path) => browserSync.reload(path)))
    .on("add", gulp.series("build-dev", (path) => browserSync.reload(path)));
}));

gulp.watch([`${appDir}/**/*.html`], gulp.series("build-html"));

