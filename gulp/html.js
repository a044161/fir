"use strict";

const path = require("path");

const gulp = require("gulp");
const htmlReplace = require("gulp-html-replace");
const fileInclude = require("gulp-file-include");
const inject = require("gulp-inject");
const cached = require("gulp-cached");

const _path = require("./config").path;
const _file_type = require("./config").file_type;

const stream = require("./server").stream;

function html() {
  return gulp
    .src(path.join(_path.src, _file_type.html))
    .pipe(
      fileInclude({
        prefix: "@@",
        basePath: path.join(_path.src, _file_type.html)
      })
    )
    .pipe(cached("html"))
    .pipe(gulp.dest(_path.dist))
    .pipe(stream());
}

module.exports = html;
