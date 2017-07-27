'use strict';

const path = require('path');

const gulp = require('gulp');
const cached = require('gulp-cached');
const env = require('gulp-environment');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');

const _path = require('./config').path;
const _file_type = require('./config').file_type;

const stream = require('./server').stream;

function image(){
	return gulp.src(path.join(_path.src,_file_type.image))
		.pipe(
			env.if.production(
				imagemin([
					imagemin.gifsicle({interlaced: true}),
					imageminJpegRecompress({
						max: 40
					}),
					imageminPngquant(),
					imagemin.svgo()
				],{
					verbose:true
				})
			)
		)
		.pipe(cached('images'))
		.pipe(gulp.dest(_path.dist))
		.pipe(stream())
}

function font(){
	return gulp.src(path.join(_path.src,_file_type.font))
		.pipe(gulp.dest(_path.dist))
		.pipe(stream())
}

exports.image = image;
exports.font = font;