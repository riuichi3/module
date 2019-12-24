
const gulp = require("gulp");
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const autoprefixer = require("gulp-autoprefixer")
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const del = require('del');
const browserSync = require('browser-sync');
const connect = require('gulp-connect-php');

const pug = require('gulp-pug');



const paths = {
  src:'./src/',
  dist:'./dist/',
  style:'**/*.scss',
  pug:'**/*.pug'
}

//distの掃除
function clean(){
  return del(paths.dist);
}
exports.clean = clean;


// ウェブサーバー(include 無効)
// const browserSyncOption = {
//   port: 8080,
//   server: {
//     baseDir: paths.dist,
//     index: 'index.html',
//   },
//   reloadOnRestart: true,
// };
// function browsersync(done) {
//   browserSync.init(browserSyncOption);
//   done();
// }





// ウェブサーバー(php include 有効)
function browsersync(done) {
  connect.server({
    port:8080,
    base: paths.dist,
    router: "router.php",
  }, function (){
    browserSync({
      notify: false,
      reloadDelay: 2000,
      proxy: 'localhost:8080',
      startPath: 'index.html'
    });
  });
  done();
};





// pug
function html() {
  return gulp.src([paths.src + '/{,**/}*.pug', '!'+paths.src + '/**/_*.pug'])
      .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(pug({
          pretty: true,
          basedir:paths.src
      }))
      .pipe(gulp.dest( paths.dist )); // 書き出し先
};
exports.html = html;





// css
function styles(){
  return gulp.src( paths.src + paths.style )
  .pipe(sass({
      outputStyle: 'expanded'//expanded || compressed
  }))
  .pipe(plumber({ //エラーを検知しデスクトップ通知
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(autoprefixer({ //ベンダープレフィックスを付与
      overrideBrowserslist: 'last 2 versions'
  }))
  // .pipe(cssmin()) //圧縮
  .pipe(gulp.dest(paths.dist + ''))
  browser();
}
exports.styles = styles;


function watchFiles(done) {
  const browserReload = () => {
    browserSync.reload();
    done();
  };
  gulp.watch(paths.src + paths.style).on('change',
    gulp.series(styles, browserReload)
  );
  gulp.watch(paths.src + paths.pug).on('change',
    gulp.series(html, browserReload)
  );
}


gulp.task('default', 
  gulp.series(
    clean,
    gulp.parallel(
      styles,
      html
    ),
    gulp.series(
      browsersync,
      watchFiles
    )
  )
);
