const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const svgstore = require("gulp-svgstore");
const sync = require("browser-sync").create();
const csso = require("csso");
var uglify = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");

//Clean

const clean = () => {
  return del("build");
};
exports.clean = clean;

//Copy

const copy = () => {
  return gulp
    .src(
      [
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
        "source/*.ico",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
};

exports.copy = copy;

// Styles

const styles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Sprite

const sprite = () => {
  return gulp
    .src("source/img/svg_inline/*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

exports.sprite = sprite;

//html

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(posthtml())
    .pipe(gulp.dest("build/"))
    .pipe(sync.stream());
};

exports.html = html;

// Img

const images = () => {
  return gulp
    .src("source/img/**/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.svgo(),
      ])
    );
};

exports.images = images;

// WebP

const createWebp = () => {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
};
exports.webp = createWebp;

// js

const scripts = () => {
  return pipeline(
    gulp.src("js/*.js"),
    uglify(),
    rename("index.min.js"),
    gulp.dest("build/js")
  );
};

exports.scripts = scripts;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
};

//Build

const build = () => gulp.series("clean", "copy", "css", "sprite", "html");

exports.build = build;

exports.default = gulp.series(build, scripts, server, styles, watcher);
