"use strict";

const path = require("path");

const gulp = require("gulp");
const watcher = require("gulp-watch");

const _file_type = require("./config").file_type;
const _path = require("./config").path;
const server = require("./server");
const task_html = require("./html");
const task_js = require("./scripts");
const task_styles = require("./styles");
const task_image = require("./others").image;

function unlinkEvt(type) {
	console.log(type);
}

function watch() {
	watcher(
		path.join(_path.src, _file_type.html),
		gulp.series(task_html, gulp.parallel(server.reload)),
		unlinkEvt
	);
	watcher(
		path.join(_path.src, _file_type.css),
		gulp.series(task_styles, gulp.parallel(server.reload))
	), unlinkEvt;
	watcher(
		path.join(_path.src, _file_type.js),
		gulp.series(task_js, gulp.parallel(server.reload)),
		unlinkEvt
	);
	watcher(
		path.join(_path.src, _file_type.image),
		gulp.series(task_image, gulp.parallel(server.reload)),
		unlinkEvt
	);
}

module.exports = watch;
