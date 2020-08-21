const gulp = require("gulp");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const iconfont = require("gulp-iconfont");
const consolidate = require("gulp-consolidate");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const del = require("del");
const browserSync = require("browser-sync");
const connect = require("gulp-connect-php");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const gulpif = require("gulp-if");
const minimist = require("minimist");
const svgmin = require("gulp-svgmin");
const svgstore = require("gulp-svgstore");
const purgecss = require("gulp-purgecss");

const aigis = require("gulp-aigis");
const pug = require("gulp-pug");

const envOption = {
  string: "env",
  default: { env: process.env.NODE_ENV || "development" }, // NODE_ENVに指定がなければ開発モードをデフォルトにする
};
const options = minimist(process.argv.slice(2), envOption);
const isProduction = options.env === "production" ? true : false;
const isDevelopment = options.env !== "production" ? false : true;
console.log("[build env]", options.env, "[is production]", isProduction);

const contentDir = "ex/hoge/";
const src = "src/";
const dist = "dist/" + contentDir;
const deploy = "deploy/";

const paths = {
  style: src + "**/*.scss",
  pug: [src + "**/*.pug", "!" + src + "**/_*.pug"],
  image: src + "**/*.{jpg,jpeg,png,gif,svg}",
  font: src + "**/iconfonts/",
  tmpFont: src + "assets/css/iconfonts/_icon.scss",
  tmpFontScss: src + "assets/css/foundation/",
  distIconfont: dist + "assets/css/iconfonts/",
  js: src + "**/*.{js,es}",
  svg: src + "**/_svgSprite/*.svg",
  svgDist: dist + "assets/img/",
  files: [src + "**/fonts/*.*", src + "**/*.php", src + "**/*.mp4"], //監視下に無いファイル
};

//distの掃除
function clean() {
  return del(dist);
}
exports.clean = clean;

//deployの掃除
function cleanDeploy() {
  return del(deploy);
}
exports.cleanDeploy = cleanDeploy;

// ウェブサーバー(php include 有効)
function browsersync(done) {
  connect.server(
    {
      port: 8080,
      base: "./dist/",
      router: "router.php",
    },
    function () {
      browserSync({
        notify: false,
        reloadDelay: 500,
        proxy: "localhost:8080",
        startPath: contentDir + "index.html",
      });
    }
  );
  done();
}

// pug
function html() {
  return gulp
    .src(paths.pug)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(
      pug({
        pretty: true,
        basedir: src,
      })
    )
    .pipe(gulp.dest(dist)); // 書き出し先
}
exports.html = html;

// css
function styles() {
  return (
    gulp
      .src(paths.style)
      .pipe(sassGlob())
      .pipe(
        sass({
          outputStyle: "compact", //expanded || compact || compressed
        })
      )
      .pipe(
        autoprefixer({
          cascade: false,
        })
      )
      .pipe(
        plumber({
          //エラーを検知しデスクトップ通知
          errorHandler: notify.onError("Error: <%= error.message %>"),
        })
      )
      .pipe(gulpif(isProduction, cssmin()))
      // .pipe(cssmin()) //圧縮
      .pipe(gulp.dest(dist))
  );
  browser();
}
exports.styles = styles;

// スタイルガイド
function styleguide() {
  return gulp.src("_aigis/aigis_config.yml").pipe(aigis());
}
exports.styleguide = styleguide;

// 使われていないstyleを削除する
gulp.task("purgecss", () => {
  return gulp
    .src(dist + "**/*.css")
    .pipe(
      purgecss({
        content: [dist + "**/*.html"],
      })
    )
    .pipe(gulp.dest(deploy));
});

/***************************************************************************
 * アイコンフォント
 ***************************************************************************/
const runTimestamp = Math.round(Date.now() / 1000);
function iconfonts() {
  return gulp
    .src(paths.font + "*.svg")
    .pipe(
      iconfont({
        startUnicode: 0xf001,
        fontName: "icon",
        formats: ["ttf", "eot", "woff", "svg"],
        appendCodepoints: false,
        normalize: true,
        fontHeight: 1000,
        timestamp: runTimestamp,
      })
    )
    .on("glyphs", function (glyphs) {
      gulp
        .src(paths.tmpFont)
        .pipe(
          consolidate("lodash", {
            glyphs: glyphs.map(function (glyph) {
              return {
                fileName: glyph.name,
                codePoint: glyph.unicode[0]
                  .charCodeAt(0)
                  .toString(16)
                  .toUpperCase(),
              };
            }),
            fontName: "icon",
            fontPath: "./iconfonts/",
            cssClass: "icon",
          })
        )
        .pipe(gulp.dest(paths.tmpFontScss));
    })
    .pipe(gulp.dest(paths.distIconfont));
}
exports.iconfonts = iconfonts;

// webpackの設定ファイルの読み込み
function js() {
  const webpackConfig = require("./webpack.config.js");
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest(dist));
}
exports.js = js;

// 画像最適化
function image() {
  return gulp
    .src([paths.image, "!" + src + "**/iconfonts/*.svg", "!" + paths.svg], {
      since: gulp.lastRun(image),
    })
    .pipe(
      imagemin({
        progressive: true,
        use: [pngquant({ quality: "65-80", speed: 1 })],
      })
    )
    .pipe(gulp.dest(dist)); // 書き出し先
}
exports.image = image;

// svgスプライト
function svg() {
  return gulp
    .src(paths.svg, { since: gulp.lastRun(image) })
    .pipe(
      svgmin({
        plugins: [
          {
            removeViewBox: false, //ViewBox属性を削除する
          },
        ],
      })
    )
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(gulp.dest(paths.svgDist)); // 書き出し先
}
exports.svg = svg;

// タスクに乗ってないファイルのコピー
function copy() {
  return gulp.src(paths.files).pipe(gulp.dest(dist));
}
exports.copy = copy;

// deployへコピー
function copyToDeploy() {
  return gulp.src("dist/**/*").pipe(gulp.dest(deploy));
}
exports.copyToDeploy = copyToDeploy;

function watchFiles(done) {
  const browserReload = () => {
    browserSync.reload();
    done();
  };
  gulp
    .watch(paths.style)
    .on("change", gulp.series(styles, styleguide, browserReload));
  gulp.watch(paths.pug).on("change", gulp.series(html, browserReload));
  gulp.watch(paths.font).on("change", gulp.series(iconfonts, browserReload));
  gulp.watch(paths.js).on("change", gulp.series(js, browserReload));
  gulp.watch(paths.image).on("change", gulp.series(image, browserReload));
  gulp.watch(paths.svg, svg);
}

gulp.task(
  "deploy",
  gulp.series(
    cleanDeploy,
    clean,
    gulp.parallel(styles, html, iconfonts, image, svg, js, copy),
    copyToDeploy
  )
);

gulp.task(
  "default",
  gulp.series(
    clean,
    gulp.parallel(styleguide, styles, html, iconfonts, image, svg, js, copy),
    browsersync,
    watchFiles
  )
);
