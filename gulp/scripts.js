'use strict';

const path = require('path');

const gulp = require('gulp');
const env = require('gulp-environment');
const cached = require('gulp-cached');
const babel = require('gulp-babel');
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

const _path = require('./config').path;
const _file_type = require('./config').file_type;

const stream = require('./server').stream;

function scripts(){
	return rollup({entry: path.join(_path.src, _file_type.app_entry)})
		.pipe(source(_file_type.app_entry))
		.pipe(buffer())
		.pipe(babel({
			presets: ['es2015','stage-0']
		}))
		.pipe(env.if.production(
				uglify()
		))
		.pipe(gulp.dest(_path.dist))
		.pipe(stream())
}

module.exports = scripts;