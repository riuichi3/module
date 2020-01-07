
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
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

const pug = require('gulp-pug');

const contentDir = 'ex/hoge/';
const src = './src/';
const dist = './dist/'+contentDir;

const paths = {
  style: src + '**/*.scss',
  pug: src + '**/*.pug',
  image: src + '**/*.{jpg,jpeg,png,gif,svg}',
  font: src + 'css/fonts/',
  js: src + '**/*.{js,es}'
}

//distの掃除
function clean(){
  return del(dist);
}
exports.clean = clean;









// ウェブサーバー(php include 有効)
function browsersync(done) {
  connect.server({
    port:8080,
    base: './dist/',
    router: "router.php",
  }, function (){
    browserSync({
      notify: false,
      reloadDelay: 500,
      proxy: 'localhost:8080',
      startPath: contentDir + 'index.html'
    });
  });
  done();
};





// pug
function html() {
  return gulp.src([paths.pug, '!'+paths.src + '/**/_*.pug'])
      .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(pug({
          pretty: true,
          basedir:src
      }))
      .pipe(gulp.dest( dist )); // 書き出し先
};
exports.html = html;





// css
function styles(){
  return gulp.src( paths.style )
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
  .pipe(gulp.dest(dist))
  browser();
}
exports.styles = styles;


/***************************************************************************
* アイコンフォント
***************************************************************************/
const runTimestamp = Math.round(Date.now()/1000);
function iconfonts(){
  return gulp.src(paths.font + '*.svg')
    .pipe(iconfont({
      startUnicode: 0xF001,
      fontName: 'icon',
      formats: ['ttf', 'eot', 'woff', 'svg'],
      appendCodepoints:false,
      normalize: true,
      fontHeight: 1000,
      timestamp: runTimestamp
    }))
   .on('glyphs', function(glyphs) {
      gulp.src(paths.font +'_icon.scss')
      .pipe(consolidate('lodash', {
        glyphs: glyphs.map(function(glyph) {
          return { fileName: glyph.name, codePoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() };
        }),
        fontName: 'icon',
        fontPath: './fonts/',
        cssClass: 'icon'
      }))
      .pipe(gulp.dest(src + 'css/sass/foundation/'));
    })
    .pipe(gulp.dest(dist + 'css/fonts/'));
};
exports.iconfonts = iconfonts;



// webpackの設定ファイルの読み込み
function js() {
  const webpackConfig = require("./webpack.config.js");
  return webpackStream(webpackConfig, webpack)
  .pipe(gulp.dest(dist));
}
exports.js = js;


// 画像最適化
function image() {
  return gulp.src([paths.image,'!'+src+'**/fonts/*.svg'] , { since: gulp.lastRun(image) })
  .pipe(imagemin({
      progressive: true,
      use: [pngquant({quality: '65-80', speed: 1})]
  }))
  .pipe(gulp.dest( dist )); // 書き出し先
};
exports.image = image;


function watchFiles(done) {
  const browserReload = () => {
    browserSync.reload();
    done();
  };
  gulp.watch(paths.style).on('change',
    gulp.series(styles, browserReload)
  );
  gulp.watch(paths.pug).on('change',
    gulp.series(html, browserReload)
  );
  gulp.watch(paths.font).on('change',
    gulp.series(iconfonts, browserReload)
  );
  gulp.watch(paths.js).on('change',
    gulp.series(js, browserReload)
  );
  gulp.watch(paths.image).on('change',
    gulp.series(image, browserReload)
  );
}


gulp.task('default', 
  gulp.series(
    clean,
    gulp.parallel(
      styles,
      html,
      iconfonts,
      image,
      js
    ),
    gulp.series(
      browsersync,
      watchFiles
    )
  )
);
