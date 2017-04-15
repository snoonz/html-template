'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import watch from 'gulp-watch';
import readConfig from 'read-config';
import pug from 'gulp-pug';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';

const SRC = './src';
const DEST = './public';

//pugTask
const pugTask = (lang) => {
  //出力先フォルダを設定
  let destDir = DEST+'/'+lang;

  // //JSON指定
  let common = readConfig(`${SRC}/local/common.json`);
  let locals = readConfig(`${SRC}/local/`+lang+`.json`);
  locals = Object.assign(common, locals);
  return gulp.src([`${SRC}/pug/**/*.pug`])
    .pipe(pug({
        locals: locals,
        pretty: true
    }))
    .pipe(gulp.dest(`${destDir}`));
}

//日本語タスク
gulp.task('pug:ja', () => {
  return pugTask('ja');
});

//英語タスク
gulp.task('pug:en', () => {
  return pugTask('en');
});

//日・英両タスクを1つのタスクにまとめる
gulp.task('html', gulp.series('pug:ja', 'pug:en'));

// 画像コピー
gulp.task('images', function() {
  let out = DEST + '/img';
  return gulp.src([`${SRC}/img/**/*`])
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});

// CSS
gulp.task('css', () => {
  let out = DEST + '/css';
  return gulp.src([`${SRC}/css/**/*`])
    .pipe(gulp.dest(out));
});

// Script
gulp.task('script', () => {
  let out = DEST + '/js';
  return gulp.src([`${SRC}/js/**/*`])
    .pipe(gulp.dest(out));
});

//serve
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: DEST
        }
    });
    watch([
        `${SRC}/pug/**/*.pug`,
        `${SRC}/local/**/*.json`
    ], gulp.series('html', browserSync.reload));
    watch([
        `${SRC}/img/**/*`
      ], gulp.series('images', browserSync.reload));
    watch([
        `${SRC}/css/**/*`
      ], gulp.series('css', browserSync.reload));
    watch([
        `${SRC}/js/**/*`
      ], gulp.series('script', browserSync.reload));
});

//実行
gulp.task('serve', gulp.series('browser-sync'));
gulp.task('build', gulp.parallel('html', 'images', 'css', 'script'));
gulp.task('default', gulp.series('build', 'serve'));
