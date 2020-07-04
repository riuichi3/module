const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const spritesmith = require("gulp.spritesmith");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const runSequence = require("run-sequence");
const pug = require("gulp-pug");
const plumber = require("gulp-plumber");
const watch = require("gulp-watch");
const changed = require("gulp-changed");
const connect = require("gulp-connect-php");
const browserSync = require("browser-sync");
const notify = require("gulp-notify");
const iconfont = require("gulp-iconfont");
const consolidate = require("gulp-consolidate");
const aigis = require("gulp-aigis");
const replace = require("gulp-replace");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const minimist = require("minimist");
const sourcemaps = require("gulp-sourcemaps");
const sassGlob = require("gulp-sass-glob");
const del = require("del");

// ディレクトリ設定【新規プロジェクトで変更必須】
const d = "/templatesite";
const dir = {
  src: "_src", // _srcフォルダ置き換え
  dist: "_dist" + d, // destフォルダ置き換え
};

const options = minimist(process.argv.slice(2), {
  string: "env",
  default: {
    env: "develop",
  },
});
const developMode = options.env;

// ウェブサーバー
gulp.task("connect-sync", function () {
  connect.server(
    {
      port: 8080,
      base: "_dist",
      router: "router.php",
    },
    function () {
      browserSync({
        notify: false,
        reloadDelay: 2000,
        proxy: "localhost:8080",
        startPath: "." + d + "/",
      });
    }
  );
});

// リロード
gulp.task("reload", function () {
  browserSync.reload();
});

// sass
gulp.task("sass", function () {
  if (developMode == "develop") {
    // develop
    // ---------------------------------
    gulp
      .src(dir.src + "/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(
        plumber({
          errorHandler: notify.onError("Error: <%= error.message %>"),
        })
      )
      .pipe(
        sass({
          outputStyle: "expanded", //expanded || compressed
        })
      )
      .pipe(autoprefixer("last 5 version"))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dir.dist + ""))
      .pipe(browserSync.stream());
  } else if (developMode == "production") {
    // production
    // ---------------------------------
    gulp
      .src(dir.src + "/**/*.scss")
      .pipe(sassGlob())
      .pipe(
        plumber({
          errorHandler: notify.onError("Error: <%= error.message %>"),
        })
      )
      .pipe(
        sass({
          outputStyle: "compressed", //expanded || compressed
        })
      )
      .pipe(autoprefixer("last 5 version"))
      .pipe(gulp.dest(dir.dist + ""))
      .pipe(browserSync.stream());
  }
});

gulp.task("aigis", function () {
  gulp.src("_aigis/aigis_config.yml").pipe(aigis());
});

// https://www.imamura.biz/blog/27675
//文字列の置換（削除）
gulp.task("replace", function () {
  //「replace」のタスク内容を書こう
  gulp
    .src(dir.dist + "/common/css/style.css") //「style.css」ファイルを指定
    .pipe(replace(/\/\*([\s\S]*?)\*\//g, "")) //正規表現で「/*~*/」という文字列を空文字に置換（つまり削除している）
    .pipe(gulp.dest(dir.dist + "/common/css/")); //「build」配下に「style.css」ファイルを作成
});

// sprite
gulp.task("sprite", function () {
  const spriteData = gulp
    .src(dir.src + "/common/images/sprite/*.png") //スプライトにする愉快な画像達
    .pipe(
      spritesmith({
        imgName: "sprite.png", //スプライトの画像
        cssName: "_sprite.scss", //生成されるscss
        imgPath: d + "/common/images/sprite.png", //生成されるscssに記載されるパス
        cssFormat: "scss", //フォーマット
        padding: 10,
        cssVarMap: function (sprite) {
          sprite.name = sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
        },
      })
    );
  spriteData.img.pipe(gulp.dest(dir.dist + "/common/images/")); //imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest(dir.src + "/common/css/sass/foundation/")); //cssNameで指定したcssの保存先
});

// 画像最適化
gulp.task("imagemin", function () {
  gulp
    .src([
      dir.src + "/{,**/}*.{png,jpg,gif}",
      "!" + dir.src + "/common/images/sprite/*.{png,jpg,gif}", //スプライトのリソースは除外
    ]) // 読み込みファイル
    .pipe(changed(dir.dist))
    .pipe(
      imagemin({
        progressive: true,
        use: [pngquant({ quality: "65-80", speed: 1 })],
      })
    )
    // .pipe(gulp.dest( dir.src ))
    .pipe(gulp.dest(dir.dist)); // 書き出し先
});

// pug
gulp.task("pug", function () {
  return gulp
    .src([dir.src + "/{,**/}*.pug", "!./_src/**/_*.pug"])
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(
      pug({
        pretty: true,
        basedir: "./_src/",
      })
    )
    .pipe(gulp.dest(dir.dist)); // 書き出し先
});

// js/css
gulp.task("inc_js_css", function () {
  return gulp
    .src([dir.src + "/{,**/}js.pug", dir.src + "/{,**/}css.pug"])
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(
      pug({
        pretty: true,
        basedir: "./_src/",
      })
    )
    .pipe(gulp.dest(dir.dist)); // 書き出し先
});

gulp.task("dist", function (callback) {
  return runSequence(
    // タスクを直列処理する
    "copy",
    "pug",
    "iconfonts",
    "aigis",
    "sass",
    "sprite",
    // 'js',
    "imagemin",
    callback
  );
});

gulp.task("clean", function (cb) {
  del(dir.dist, cb);
});

gulp.task("build", function () {
  gulp.start(
    "copy",
    "pug",
    "iconfonts",
    "sass",
    "sprite",
    // 'js',
    "imagemin"
  );
});

// buildされないファイルをdistにコピー
gulp.task("copy", function () {
  return gulp
    .src([
      dir.src + "/{,**/}.htaccess",
      dir.src + "/{,**/}*.{json,mp4}",
      dir.src + "/{,**/lib/}*.{js,es}",
    ])
    .pipe(gulp.dest(dir.dist));
});

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config.js");
gulp.task("js", function () {
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest(dir.dist));
});

/***************************************************************************
 * アイコンフォント
 ***************************************************************************/
const runTimestamp = Math.round(Date.now() / 1000);
gulp.task("iconfonts", function () {
  return gulp
    .src(dir.src + "/common/css/fonts/*.svg")
    .pipe(
      iconfont({
        startUnicode: 0xf001,
        fontName: "icon",
        formats: ["ttf", "eot", "woff", "svg"],
        appendCodepoints: false,
        normalize: true,
        fontHeight: 500,
        timestamp: runTimestamp,
      })
    )

    .on("glyphs", function (glyphs) {
      gulp
        .src(dir.src + "/common/css/fonts/_icon.scss")
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
            fontPath: "./fonts/",
            cssClass: "icon",
          })
        )
        .pipe(gulp.dest(dir.src + "/common/css/sass/foundation/"));
    })

    .pipe(gulp.dest(dir.dist + "/common/css/fonts/"));
});

gulp.task("csstask", function (callback) {
  return runSequence(
    // タスクを直列処理する
    "sass",
    "aigis",
    "reload",
    callback
  );
});

gulp.task("default", ["dist", "connect-sync"], function () {
  gulp.watch(dir.src + "/**/*.scss", ["csstask", "inc_js_css"]);
  gulp.watch(dir.src + "/**/*.pug", ["pug", "reload"]);
  // gulp.watch(dir.src + '/**/*.{js,es}', ['js','inc_js_css','reload']);
  gulp.watch(dir.src + "/**/*.svg", ["iconfonts", "reload"]);
  gulp.watch(dir.src + "/{,**/}*.{png,jpg,gif,svg}", ["imagemin", "reload"]);
  gulp.watch(dir.src + "/common/images/sprite/*.png", ["sprite"]);
});
