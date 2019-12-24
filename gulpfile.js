
const gulp = require("gulp");
const sass = require('gulp-sass');
const sassGlob = require("gulp-sass-glob");
const cssmin = require('gulp-cssmin');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
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
  pug:'**/*.pug',
  font:'common/css/font/'
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
  .pipe(sassGlob())
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


/***************************************************************************
* アイコンフォント
***************************************************************************/
const runTimestamp = Math.round(Date.now()/1000);
function iconfonts(done){
  gulp.src(paths.src + '/**/fonts/*.svg')
    .pipe(iconfont({
      startUnicode: 0xF001,
      fontName: 'icon',
      formats: ['ttf', 'eot', 'woff', 'svg'],
      appendCodepoints:false,
      normalize: true,
      fontHeight: 500,
      timestamp: runTimestamp
    }))
   .on('glyphs', function(glyphs) {
      gulp.src(paths.src + paths.font +'_icon.scss')
      .pipe(consolidate('lodash', {
        glyphs: glyphs.map(function(glyph) {
          return { fileName: glyph.name, codePoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() };
        }),
        fontName: 'icon',
        fontPath: './fonts/',
        cssClass: 'icon'
      }))
      .pipe(gulp.dest(paths.src + '/common/css/sass/foundation/'));
    })
    .pipe(gulp.dest(paths.dist + '/common/css/fonts/'));
    done();
};





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
  gulp.watch(paths.src + paths.font).on('change',
    gulp.series(iconfont, browserReload)
  );
}


gulp.task('default', 
  gulp.series(
    clean,
    gulp.parallel(
      styles,
      html,
      iconfont
    ),
    gulp.series(
      browsersync,
      watchFiles
    )
  )
);
