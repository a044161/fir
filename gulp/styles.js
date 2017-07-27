"use strict";

const path = require("path");

const gulp = require("gulp");
const cached = require("gulp-cached");
const env = require("gulp-environment");
const nano = require("gulp-cssnano");
const sourcemaps = require("gulp-sourcemaps");

const _path = require("./config").path;
const _file_type = require("./config").file_type;

const stream = require("./server").stream;

const postcss = require("gulp-postcss");

function styles() {
	return gulp
		.src(path.join(_path.src, _file_type.css))
		.pipe(sourcemaps.init())
		.pipe(postcss([require("precss")]))
		.pipe(
			env.if.production(
				nano({
					zindex: false,
					reduceIdents: false
				})
			)
		)
		.pipe(env.if.development(cached("styles")))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(_path.dist))
		.pipe(stream());
}

module.exports = styles;
